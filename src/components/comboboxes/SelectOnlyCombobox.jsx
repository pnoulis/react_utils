/*
  ------------------------------ Select Only Combobox ------------------------------

  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/

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
  useTypeahead,
  useFocus,
  useClick,
  autoUpdate,
} from "@floating-ui/react";
import { ComboboxCtx, useComboboxCtx } from "./Context.jsx";

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

  // Options and Labels initialization
  if (optionsRef.current == null) {
    labelsRef.current = getLabels(initialOptions) || [];

    if (labelsRef.current.length !== initialOptions.length) {
      throw new Error("Error by getLabels()");
    }

    optionsRef.current = new Map();
    labelsRef.current.forEach((label, i) =>
      optionsRef.current.set(label, initialOptions[i]),
    );
  }

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
    initialPlacement: "top",
    placement: "top",
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        apply({ rects, elements }) {
          elements.floating.style.minWidth = `${rects.reference.width}px`;
        },
      }),

      flip({
        fallbackStrategy: "initialPlacement",
      }),
      shift(),
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
    useClick(data.context, {
      keyboardHandlers: false,
    }),
    useTypeahead(data.context, {
      listRef: labelsRef,
      activeIndex,
      onMatch: setActiveIndex,
      resetMs: 500,
    }),
  ]);

  const onInputValueChange = (e) => {
    let value;
    if (e.target) {
      value = e.target.value;
      setIsOpen(true);
    } else {
      value = e;
    }
    setInputValue(value);
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
    [isOpen, setIsOpen, inputValue, setInputValue, interactions, data],
  );
}

function Trigger({ placeholder, className, children, ...props }) {
  const ctx = useComboboxCtx();

  return typeof children === "function" ? (
    children({
      readOnly: true,
      id: `${ctx.name}-trigger`,
      ref: ctx.refs.setReference,
      role: "combobox",
      ["aria-controls"]: `${ctx.name}-listbox`,
      ["aria-expanded"]: ctx.isOpen,
      ["aria-haspopup"]: "listbox",
      ["aria-labelledby"]: ctx.labelledBy,
      tabIndex: 0,
      name: ctx.name,
      type: "text",
      placeholder: placeholder,
      value: ctx.inputValue,
      onChange: ctx.onInputValueChange,
      ...ctx.getReferenceProps({
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
              }
              break;
            case "Space":
              ctx.setIsOpen(false);
              break;
            case "Escape":
              if (!ctx.isOpen) {
                ctx.onInputValueChange("");
                ctx.setActiveIndex(null);
                ctx.refs.domReference.current?.blur();
                ctx.onSelect("");
              }
              break;
            case "Tab":
              break;
            default:
              break;
          }
        },
      }),
      ...props,
    })
  ) : (
    <input
      readOnly
      id={`${ctx.name}-trigger`}
      ref={ctx.refs.setReference}
      className={`combobox trigger ${className || ""}`}
      role="combobox"
      aria-controls={`${ctx.name}-listbox`}
      aria-expanded={ctx.isOpen}
      aria-haspopup="listbox"
      aria-labelledby={ctx.labelledBy}
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
              }
              break;
            case "Space":
              ctx.setIsOpen(false);
              break;
            case "Escape":
              if (!ctx.isOpen) {
                ctx.onInputValueChange("");
                ctx.setActiveIndex(null);
                ctx.refs.domReference.current?.blur();
                ctx.onSelect("");
              }
              break;
            case "Tab":
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
                }),
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
  },
);

export const SelectOnlyCombobox = {
  Provider,
  Trigger,
  Listbox,
  Option,
};
