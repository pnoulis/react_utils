import * as React from "react";
import styled from "styled-components";
import { alertDialog } from "/src/components/dialogs/index.js";

const ProvideAlertDialog = alertDialog.Provider;
const Dialog = alertDialog.Dialog;
const Trigger = alertDialog.Trigger;
const Heading = alertDialog.Heading;
const Description = alertDialog.Description;

export default function ScratchAlertDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <h1>Scratch alert dialog</h1>
      <div>
        {/* <h3 onClick={() => setIsOpen(true)}>open dialog</h3> */}
        <ProvideAlertDialog>
          <Trigger>yolo</Trigger>
          <Dialog>
            <Heading>some heading</Heading>
            <Description>some description</Description>
          </Dialog>
        </ProvideAlertDialog>
      </div>
    </div>
  );
}
