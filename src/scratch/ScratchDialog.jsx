import * as React from "react";
import { BasicDialog } from "/src/components/dialogs/index.js";
import styled, { css } from "styled-components";

const indicators = css`
  ${({ selected, active }) => {
    if (selected) {
      return `
        background-color: pink;
      `;
    } else if (active) {
      return `
        background-color: green;
      `;
    } else {
      return `
        &:hover {
          background-color: yellow;
        }
        &:focus {
          background-color: red;
        }
      `;
    }
  }}

  &:active {
    background-color: blue;
  }
`;

const StyleHeading = styled(BasicDialog.Heading)`
  ${indicators}
`;

const StyleDescription = styled(BasicDialog.Description)`
  ${indicators}
`;

const StyleClose = styled(BasicDialog.Close)`
  ${indicators}
`;

const StyleConfirm = styled(BasicDialog.Confirm)`
  ${indicators}
`;

function Dialog() {
  return (
    <>
      <BasicDialog.Provider initialOpen>
        <BasicDialog.Trigger>open dialog</BasicDialog.Trigger>
        <BasicDialog.Content>
          <StyleHeading>yolo heading</StyleHeading>
          <StyleDescription>yolo description</StyleDescription>
          <StyleClose>close</StyleClose>
          <StyleConfirm>done</StyleConfirm>
        </BasicDialog.Content>
      </BasicDialog.Provider>
    </>
  );
}
export default function ScratchDialog() {
  return (
    <div>
      <h1>Scratch dialog</h1>
      <Dialog />
    </div>
  );
}
