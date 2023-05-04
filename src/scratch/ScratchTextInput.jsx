import * as React from "react";
import styled from "styled-components";

const StyleTextInput1 = styled.div`
  width: 50px;
  height: 50px;
  background-color: red;
`;

function TextInput_1({ className }) {
  return (
    <StyleTextInput1 className={className || ""}>
      <p>text input 1</p>
    </StyleTextInput1>
  );
}

function TextInput_3({ className, children, ...props }) {
  return (
    <div className={`${className || ""} textInput`} {...props}>
      <p>text input 3</p>
    </div>
  );
}

const StyleTextInput3 = styled(TextInput_3)`
  width: 100px;
  height: 100px;
  background-color: red;
`;

export { TextInput_1, TextInput_3, StyleTextInput3 };
