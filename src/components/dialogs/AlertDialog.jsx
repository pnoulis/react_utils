import * as React from "react";
import { DialogCtx, useDialogCtx } from "./Context.jsx";

const Provider = ({ children, ...userConf }) => {
  const ctx = useDialog(userConf);
  return <DialogCtx.Provider value={ctx}>{children}</DialogCtx.Provider>;
};

function useDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onClose = () => {},
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const triggerRef = React.useRef(null);
  const dialogRef = React.useRef(null);

  function getTriggerProps(props) {
    return {
      ...props,
      onClick(e) {
        e.preventDefault();
        setOpen(true);
      },
    };
  }

  function handleClickOutside(e) {
    if (dialogRef.current.contains(e.target)) setOpen(false);
  }

  React.useEffect(() => {
    if (open) {
      dialogRef.current.removeAttribute("open");
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
      onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  return {
    open,
    setOpen,
    getTriggerProps,
    dialogRef,
    triggerRef,
  };
}

function Trigger({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <button className={className} {...ctx.getTriggerProps(props)}>
      {children}
    </button>
  );
}

function Dialog({ className, children, ...props }) {
  const ctx = useDialogCtx();

  return (
    <dialog
      ref={ctx.dialogRef}
      className={`${className || ""} dialog`}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {children}
    </dialog>
  );
}

function Heading({ className, children, ...props }) {
  return (
    <h2 className={`${className || ""} heading`} {...props}>
      {children}
    </h2>
  );
}

function Description({ className, children, ...props }) {
  return (
    <h3 className={`${className || ""} description`} {...props}>
      {children}
    </h3>
  );
}

export const alertDialog = {
  Provider,
  Dialog,
  Trigger,
  Heading,
  Description,
};
