import * as React from "react";
import styled from "styled-components";
import { useFormContext } from "./useForm.jsx";

function SimpleInput({
  className,
  type,
  name,
  label,
  optional,
  placeholder,
  ...props
}) {
  const { fields, errors, submitting, setForm } = useFormContext();

  return (
    <div className={className} {...props}>
      <input
        id={name}
        className="input"
        type={type || "text"}
        autoComplete="off"
        placeholder={placeholder || " "}
        onChange={(e) =>
          !submitting && setForm("setInput", name, e.target.value)
        }
        value={fields[name]}
      />
    </div>
  );
}

const StyledSimpleInput = styled(SimpleInput)`
  all: unset;
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: 60px;
  height: max-content;
  pointer-events: none;
  position: relative;
  text-align: center;

  .input {
    pointer-events: auto;
    width: 100%;
    height: 55px;
    padding: 0 6px;
    border-radius: var(--br-sm);
    border: 1px solid var(--black-base);
    font-size: var(--tx-nl);
    text-align: center;
    letter-spacing: 1.5px;
    outline: none;
    color: black;
  }
`;

export { SimpleInput, StyledSimpleInput };
