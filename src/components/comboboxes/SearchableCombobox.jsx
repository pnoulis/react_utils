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
  getLabels = () => {},
  defaultLabel = "",
  onSelect = () => {},
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  asTable = false,
  allowCustomValue = true,
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

  // Options and Labels initialization
  if (optionsRef.current == null) {
    labelsRef.current = getLabels(initialOptions) || [];

    if (labelsRef.current.length !== initialOptions.length) {
      throw new Error("Error by getLabels()");
    }

    optionsRef.current = new Map();
    labelsRef.current.forEach((label, i) =>
      optionsRef.current.set(label, initialOptions[i])
    );
  }

  const fuse = React.useMemo(
    () =>
      new Fuse(Array.from(optionsRef.current.keys()), {
        threshold: 0.1,
      }),
    [initialOptions]
  );
  const filter = (term) => fuse.search(term).map((match) => match.item);

  React.useEffect(() => {
    if (inputValue) return;
    labelsRef.current.forEach((label, i) => {
      if (label === defaultLabel) {
        setActiveIndex(i);
        setInputValue(label);
      }
    });
  }, [isOpen, initialOptions, defaultLabel]);

  const data = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
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
      activeIndex,
      setActiveIndex,
      optionsRef,
      labelsRef,
      listRef,
      ...data,
      ...interactions,
    }),
    [isOpen, setIsOpen, inputValue, setInputValue, interactions, data]
  );
}

function Trigger({ placeholder, className, ...props }) {
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
      onChange={ctx.onInputValueChange}
      {...ctx.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              if (
                ctx.activeIndex != null &&
                ctx.labelsRef.current[ctx.activeIndex]
              ) {
                const label = ctx.labelsRef.current[ctx.activeIndex];
                ctx.onInputValueChange(label);
                ctx.setActiveIndex(null);
                ctx.setIsOpen(false);
                ctx.onSelect(ctx.optionsRef.current.get(label));
              } else {
                ctx.setActiveIndex(null);
                ctx.setIsOpen(false);
                ctx.onSelect(ctx.inputValue);
              }

              break;
            case "Escape":
              if (!ctx.isOpen) {
                ctx.onInputValueChange("");
                ctx.setActiveIndex(null);
                ctx.refs.domReference.current?.blur();
                ctx.onSelect("");
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
          {ctx.optionsRef.current.size >= 1
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
                    ctx.onInputValueChange(label);
                    ctx.setIsOpen(false);
                    ctx.onSelect(ctx.optionsRef.current.get(label));
                  },
                })
              )
            : renderOnEmpty}
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
  }
);

export const SearchableCombobox = {
  Provider,
  Trigger,
  Listbox,
  Option,
};
