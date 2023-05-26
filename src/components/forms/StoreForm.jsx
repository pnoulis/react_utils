import * as React from "react";
import { ContextProvideForm } from "./ContextForm.jsx";

function StoreProvideForm({ children }) {
  const store = useForm();
  return <ContextProvideForm form={store}>{children}</ContextProvideForm>;
}

function useForm({ name, fields }) {
  const [form, setForm] = React.useState({});
  const formRef = React.useRef(form);
  formRef.current = form;
  return {
    ...form,
    setForm,
    formRef,
  };
}
export { useStoreForm, StoreProvideForm };
