import * as React from "react";
import styled from "styled-components";
import { useFormContext } from "./useForm.jsx";

function TextArea({
  className,
  disabled,
  name,
  placeholder,
  rows,
  cols,
  onChange,
  ...props
}) {
  const { fields, errors, submitting, setForm, formId } = useFormContext();

  return (
    <textarea
      error={errors[name]}
      id={name}
      form={formId}
      className={className || ""}
      autoComplete="off"
      rows={rows ?? 5}
      cols={cols ?? 5}
      autoFocus={true}
      placeholder={placeholder || " "}
      value={fields[name] || ""}
      disabled={disabled}
      onChange={(e) => {
        if (!submitting) {
          setForm("setInput", name, e.target.value);
          onChange && onChange(e.target.value);
        }
      }}
      {...props}
    />
  );
}

export { TextArea };
