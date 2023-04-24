import * as React from "react";
import { FlashMessages } from "/src/components/flash_messages/index.js";
import styled from "styled-components";

const flashMessages = new FlashMessages();
function makeFm() {
  flashMessages.info({ message: "whatthehello" });
}

export default function ScratchFlashMessage() {
  return (
    <div>
      <h1>scratch flash message</h1>
      <button onClick={makeFm}> make flash message</button>
    </div>
  );
}
