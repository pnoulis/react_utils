import * as React from "react";
const DialogCtx = React.createContext(null);
const useDialogCtx = () => {
  const ctx = React.useContext(DialogCtx);
  if (ctx == null) {
    throw new Error("Component is not being provided the <Dialog/> context");
  }
  return ctx;
};

export { useDialogCtx, DialogCtx };
