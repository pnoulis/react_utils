import { ContextProvideForm } from "./ContextForm.jsx";
import { useStoreForm } from "./StoreForm.jsx";
/*
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
 */
function Form({
  action,
  method,
  enctype,
  autoComplete,
  autoCapitalize,
  nonValidate,
  className,
  children,
  ...props
}) {
  return <form></form>;
}

function FormSubmit() {
  // turns submitting true
  // if there are no errors,
  // if all optionals have been
}

function FormErrors({ renderErrors, ...props }) {
  // get erros
  // for each error
}
