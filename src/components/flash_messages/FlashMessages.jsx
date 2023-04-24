import * as React from "react";
import * as ReactClient from "react-dom/client";
import {
  DefaultInfoFm,
  DefaultErrorFm,
  DefaultSuccessFm,
  DefaultWarnFm,
  DefaultFmRoot,
} from "./DefaultFlashMessages.jsx";
import { FlashMessagesRoot } from "./FlashMessagesRoot.jsx";

function FlashMessages({
  id = Math.random().toString(36).substring(2, 10),
  Info: CustomInfoFm,
  Warn: CustomWarnFm,
  Error: CustomErrorFm,
  Success: CustomSuccessFm,
  FmRoot: CustomFmRoot,
} = {}) {
  this.id = id;
  this.Info = CustomInfoFm || DefaultInfoFm;
  this.Warn = CustomWarnFm || DefaultWarnFm;
  this.Error = CustomErrorFm || DefaultErrorFm;
  this.Success = CustomSuccessFm || DefaultSuccessFm;
  this.FmRoot = CustomFmRoot || DefaultFmRoot;
  this.mount();
}

FlashMessages.prototype.mount = function mount() {
  this.mountPoint = document.getElementById("flash-messages-react-root");

  if (this.mountPoint == null) {
    this.mountPoint = document.createElement("div");
    this.mountPoint.setAttribute("id", "flash-messages-react-root");
    const body = document.getElementsByTagName("body")[0];
    if (body == null) {
      throw new Error("Missing <body></body> element");
    }
    body.appendChild(this.mountPoint);
  }

  const rootRef = React.createRef(null);
  ReactClient.createRoot(this.mountPoint).render(
    <React.StrictMode>
      <FlashMessagesRoot FlashMessages={this} rootRef={rootRef}>
        <this.FmRoot ref={rootRef} id={this.id} />
      </FlashMessagesRoot>
    </React.StrictMode>
  );
};

FlashMessages.prototype.render = function render(fmRoot, fmContent) {
  this.mountPoint.appendChild(fmRoot);
  ReactClient.createRoot(fmRoot).render(fmContent);
  this.setFm({ timeout: fmRoot.getAttribute("data-timeout") });
};

FlashMessages.prototype.createRoot = function createRoot({
  timeout = 7000,
} = {}) {
  timeout = Date.now() + timeout;
  const fmRoot = document.createElement("article");
  fmRoot.setAttribute("class", "flash-message");
  fmRoot.setAttribute("data-timeout", timeout);
  return fmRoot;
};

FlashMessages.prototype.info = function info(props, options) {
  const fmRoot = this.createRoot(options);
  this.render(fmRoot, <this.Info {...props} />);
};

FlashMessages.prototype.warn = function warn(props, options) {
  const fmRoot = this.createRoot(options);
  this.render(fmRoot, <this.Warn {...props} />);
};

FlashMessages.prototype.error = function error(props, options) {
  const fmRoot = this.createRoot(options);
  this.render(fmRoot, <this.Error {...props} />);
};

FlashMessages.prototype.success = function success(props, options) {
  const fmRoot = this.createRoot(options);
  this.render(fmRoot, <this.Success {...props} />);
};

FlashMessages.prototype.custom = function custom(CustomFm, options) {
  if (!React.isValidElement(CustomFm)) {
    throw new Error("Custom Flash Message is not a valid React Element");
  }

  const fmRoot = this.createRoot(options);
  this.render(fmRoot, CustomFm);
};

export { FlashMessages };
