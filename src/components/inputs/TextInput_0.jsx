import * as React from "react";
import styled from "styled-components";
import { useFormContext } from "./useForm.jsx";

const StyledTextInput = styled.div`
  // defaults
  all: unset;
  display: block;
  box-sizing: border-box;

  // content
  // dimensions
  width: 100%;
  min-height: 60px;
  height: max-content;
  // appearance
  // dynamic
  pointer-events: none;
  // position
  position: relative;
  text-align: center;

  .input {
    pointer-events: auto;
    width: 100%;
    // height: 100%;
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

  .label {
    padding: 0 5px;
    border-radius: var(--br-sm);
    letter-spacing: 1.5px;
    font-size: var(--tx-md);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(20px, -50%);
    transition-property: top, font-size;
    transition-duration: 0.3s;
    color: var(--black-subtle);
    pointer-events: none;
    text-transform: uppercase;
  }

  .optional {
    position: absolute;
    font-size: var(--tx-md);
    border-radius: var(--br-sm);
    pointer-events: none;
    letter-spacing: 1.5px;
    top: 50%;
    right: 10px;
    padding: 0 5px;
    transform: translate(0, -50%);
    color: var(--info-base);
  }

  &:not(:focus-within) .input::placeholder {
    opacity: 0;
  }

  &:focus-within .input::placeholder {
    opacity: 0.3;
  }

  .input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: white;
  }

  .input:focus ~ .optional,
  input:not(:placeholder-shown) ~ .optional {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: white;
  }

  .input:disabled ~ .label {
    color: black;
  }

  &.error .input {
    border: 2px solid var(--error-base);
    text-transform: lowercase;
  }

  &.error .label,
  &.error .optional {
    color: var(--error-base);
  }

  &.success .input {
    border: 2px solid var(--success-base);
  }

  &.success .label {
    color: var(--success-strong);
  }
`;

const StyleError = styled.p`
  position: absolute;
  display: block;
  width: 100%;
  padding-top: 5px;
  padding-left: 5px;
  font-size: var(--tx-nl);
  color: var(--error-base);
  text-transform: capitalize;
  letter-spacing: 1px;
`;

const TextInput_0 = React.forwardRef(function TextInput_0(
  { className, type, name, label, optional, placeholder, ...props } = {},
  ref,
) {
  const { fields, errors, submitting, setForm } = useFormContext();
  return (
    <StyledTextInput
      className={`${className || ""} ${errors[name] && "error"}`}
    >
      <input
        ref={ref}
        className="input"
        type={type || "text"}
        id={name}
        autoComplete="off"
        placeholder={placeholder || " "}
        onChange={(e) =>
          !submitting && setForm("setInput", name, e.target.value)
        }
        value={fields[name]}
        {...props}
      ></input>
      <label className="label" htmlFor={name}>
        {label || name}
      </label>
      {errors[name] ? null : (
        <span className="optional">{optional && "optional"}</span>
      )}
      <StyleError>{errors[name]}</StyleError>
    </StyledTextInput>
  );
});

export { TextInput_0 };
