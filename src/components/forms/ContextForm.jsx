import * as React from "react";

const ContextForm = React.createContext(null);

function ContextProvideForm({ form, children }) {
  return <ContextForm.Provider value={form}>{children}</ContextForm.Provider>;
}

function useContextForm() {
  const ctx = React.useContext(ContextForm);
  if (ctx == null) {
    throw new Error("ContextForm is null");
  }
  return ctx;
}

export { ContextProvideForm, useContextForm };
