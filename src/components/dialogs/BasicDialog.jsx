import * as React from "react";
import { DialogCtx, useDialogCtx } from "./Context.jsx";

const Provider = ({ children, ...userConf }) => {
  const ctx = useDialog(userConf);
  return <DialogCtx.Provider value={ctx}>{children}</DialogCtx.Provider>;
};

function useDialog({
  id = Math.random().toString(36).substring(2, 10),
  onClose = (confirmed) => {},
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;
  const dialogRef = React.createRef(null);
  const labelledBy = `${id}-label`;
  const describedBy = `${id}-description`;

  function getTriggerProps(mergeProps) {
    return {
      ...mergeProps,
      id: `${id}-trigger`,
      onClick(e) {
        e.preventDefault();
        setIsOpen(true);
      },
    };
  }

  function getCloseProps(mergeProps) {
    return {
      ...mergeProps,
      id: `${id}-close`,
      onClick(e) {
        e.preventDefault();
        setIsOpen(false);
        onClose(false);
      },
    };
  }

  function getConfirmProps(mergeProps) {
    return {
      ...mergeProps,
      id: `${id}-confirm`,
      onClick(e) {
        e.preventDefault();
        setIsOpen(false);
        onClose(true);
      },
    };
  }

  function getDialogProps(mergeProps) {
    return {
      ...mergeProps,
      id,
      ref: dialogRef,
    };
  }

  function handleKeyDown(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      setIsOpen(false);
      onClose(false);
    }
  }

  React.useEffect(() => {
    if (isOpen && dialogRef.current.open == false) {
      dialogRef.current.showModal();
      window.addEventListener("keydown", handleKeyDown);
    } else if (!isOpen && dialogRef.current.open == true) {
      dialogRef.current.close();
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, setIsOpen]);

  return {
    getTriggerProps,
    getDialogProps,
    getCloseProps,
    getConfirmProps,
    labelledBy,
    describedBy,
  };
}

function Trigger({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <button
      className={`${className || ""} trigger`}
      {...ctx.getTriggerProps(props)}
    >
      {children}
    </button>
  );
}

function Content({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <dialog
      className={`${className || ""} dialog`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ctx.labelledBy}
      aria-describedby={ctx.describedBy}
      {...ctx.getDialogProps(props)}
    >
      {children}
    </dialog>
  );
}

function Heading({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <h2 id={ctx.labelledBy} className={`${className || ""} heading`} {...props}>
      {children}
    </h2>
  );
}

function Description({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <h3
      id={ctx.describedBy}
      className={`${className || ""} description`}
      {...props}
    >
      {children}
    </h3>
  );
}

function Close({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <button
      className={`${className || ""} close`}
      type="button"
      {...ctx.getCloseProps(props)}
    >
      {children}
    </button>
  );
}

function Confirm({ className, children, ...props }) {
  const ctx = useDialogCtx();
  return (
    <button
      className={`${className || ""} confirm`}
      type="button"
      {...ctx.getConfirmProps(props)}
    >
      {children}
    </button>
  );
}

export const BasicDialog = {
  Provider,
  Content,
  Trigger,
  Heading,
  Description,
  Close,
  Confirm,
};
