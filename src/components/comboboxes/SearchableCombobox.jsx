/*
  ------------------ Bound Editable Combobox by List Autocomplete --------------

  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

  This Combobox is an extension to the editable combobox. It
  allows the user to limit the list of options based on his input.
 */

import * as React from "react";
import {
  useFloating,
  flip,
  shift,
  size,
  useListNavigation,
  useDismiss,
  useInteractions,
  useClick,
  useFocus,
  autoUpdate,
} from "@floating-ui/react";
import { ComboboxCtx, useComboboxCtx } from "./Context.jsx";
import Fuse from "fuse.js";

const Provider = ({ children, ...usrConf }) => {
  const ctx = useCombobox(usrConf);
  return <ComboboxCtx.Provider value={ctx}>{children}</ComboboxCtx.Provider>;
};

function useCombobox({
  name,
  labelledBy = "",
  options: initialOptions,
  getLabels = (options) => options,
  defaultLabel = "",
  onSelect = () => {},
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  asTable = false,
  allowCustomValue = true,
  placement = "bottom-start",
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = asTable
    ? () => true
    : setControlledOpen ?? setUncontrolledOpen;
  const optionsRef = React.useRef(null);
  const labelsRef = React.useRef(null);
  const listRef = React.useRef([]);
  const minCandidate = allowCustomValue ? 0 : 1;
  const fuseRef = React.useRef([]);

  // TODO labelsRef should utilize React.useState() instead of this.
  const [forceRedraw, setForceRedraw] = React.useState();

  const filter = (term) =>
    fuseRef.current.search(term).map((match) => match.item);

  React.useEffect(() => {
    labelsRef.current = getLabels(initialOptions) || [];
    if (labelsRef.current.length !== initialOptions.length) {
      throw new Error("Error by getLabels()");
    }
    optionsRef.current = new Map();
    labelsRef.current.forEach((label, i) => {
      if (label === defaultLabel) {
        setActiveIndex(i);
        setInputValue(label);
      }
      optionsRef.current.set(label, initialOptions[i]);
    });
    fuseRef.current = new Fuse(labelsRef.current, { threshold: 0.1 });
    setForceRedraw(Math.random().toString(32).substring(2, 8));
  }, [initialOptions, defaultLabel]);

  const data = useFloating({
    open: isOpen,
    initialPlacement: placement,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({
        fallbackStrategy: "initialPlacement",
      }),
      shift(),
      size({
        apply({ rects, elements }) {
          elements.floating.style.minWidth = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const interactions = useInteractions([
    useListNavigation(data.context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      virtual: true,
      loop: true,
    }),
    useDismiss(data.context),
    useFocus(data.context, { keyboardOnly: true }),
    useClick(data.context, { keyboardHandlers: false }),
  ]);

  const onInputValueChange = (e) => {
    let value;
    if (e.target) {
      value = e.target.value;
      setIsOpen(true);
    } else {
      value = e;
    }

    if (!value) {
      setInputValue(value);
      labelsRef.current = Array.from(optionsRef.current.keys());
    } else {
      const candidates = filter(value);

      if (candidates.length >= 1) {
        setActiveIndex(0);
      }

      if (candidates.length >= minCandidate) {
        labelsRef.current = candidates;
        setInputValue(value);
      }
    }
  };

  return React.useMemo(
    () => ({
      name,
      labelledBy,
      isOpen,
      setIsOpen,
      inputValue,
      onSelect,
      setInputValue,
      onInputValueChange,
      asTable,
      activeIndex,
      setActiveIndex,
      optionsRef,
      labelsRef,
      listRef,
      ...data,
      ...interactions,
    }),
    [
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue,
      interactions,
      data,
      initialOptions,
    ],
  );
}

function Trigger({ onInputValueChange, placeholder, className, ...props }) {
  const ctx = useComboboxCtx();
  return (
    <input
      id={`${ctx.name}-trigger`}
      ref={ctx.refs.setReference}
      className={`combobox trigger ${className || ""}`}
      role="combobox"
      aria-controls={`${ctx.name}-listbox`}
      aria-expanded={ctx.isOpen}
      aria-haspopup="listbox"
      aria-labelledby={ctx.labelledBy}
      aria-autocomplete="none"
      tabIndex={0}
      name={ctx.name}
      type="text"
      placeholder={placeholder}
      value={ctx.inputValue}
      onChange={(e) => {
        ctx.onInputValueChange(e);
        onInputValueChange?.(e);
      }}
      {...ctx.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              if (
                ctx.activeIndex != null &&
                ctx.labelsRef.current[ctx.activeIndex]
              ) {
                const label = ctx.labelsRef.current[ctx.activeIndex];
                if (!ctx.asTable) {
                  ctx.onInputValueChange(label);
                  ctx.setActiveIndex(null);
                }
                ctx.setIsOpen(false);
                ctx.onSelect(
                  ctx.optionsRef.current.get(label),
                  ctx.onInputValueChange,
                );
              } else {
                ctx.setActiveIndex(null);
                ctx.setIsOpen(false);
                ctx.onSelect(ctx.inputValue, ctx.onInputValueChange);
              }

              break;
            case "Escape":
              if (!ctx.isOpen) {
                ctx.onInputValueChange("");
                ctx.setActiveIndex(null);
                ctx.refs.domReference.current?.blur();
                ctx.onSelect("", ctx.onInputValueChange);
              }
              break;
            default:
              break;
          }
        },
        ...props,
      })}
    />
  );
}

function Listbox({ renderOnEmpty, renderOption, className, ...props }) {
  const ctx = useComboboxCtx();
  return (
    <>
      {ctx.isOpen && (
        <ul
          id={`${ctx.name}-listbox`}
          ref={ctx.refs.setFloating}
          className={`combobox listbox ${className}`}
          role="listbox"
          aria-labelledby={ctx.labelledBy}
          style={{
            position: ctx.strategy,
            top: ctx.y ?? 0,
            left: ctx.x ?? 0,
          }}
          {...ctx.getFloatingProps(props)}
        >
          {ctx.optionsRef.current?.size >= 1
            ? ctx.labelsRef.current.map((label, i) =>
                renderOption({
                  id: `${ctx.name}-opt-${i}`,
                  key: label,
                  label,
                  option: ctx.optionsRef.current.get(label),
                  i,
                  ctx,
                  ref: (node) => (ctx.listRef.current[i] = node),
                  selected: label === ctx.inputValue,
                  active: ctx.activeIndex === i,
                  role: "option",
                  tabIndex: -1,
                  onClick: (e) => {
                    e.preventDefault();
                    !ctx.asTable && ctx.onInputValueChange(label);
                    ctx.setIsOpen(false);
                    ctx.onSelect(
                      ctx.optionsRef.current.get(label),
                      ctx.onInputValueChange,
                    );
                  },
                }),
              )
            : renderOnEmpty(ctx)}
        </ul>
      )}
    </>
  );
}

const Option = React.forwardRef(
  ({ active, selected, label, ctx, className, children, ...props }, ref) => {
    return (
      <li
        className={`combobox option ${className}`}
        aria-selected={selected}
        {...ctx.getItemProps({
          ref,
          ...props,
        })}
      >
        {children || label}
      </li>
    );
  },
);

export const SearchableCombobox = {
  Provider,
  Trigger,
  Listbox,
  Option,
};
