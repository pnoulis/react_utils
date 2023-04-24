import * as React from "react";
import { ReactComponent as InfoIcon } from "/assets/icons/info-outlined.svg";
import { ReactComponent as ErrorIcon } from "/assets/icons/error-outlined.svg";
import { ReactComponent as WarningIcon } from "/assets/icons/warning-outlined.svg";
import { ReactComponent as SuccessIcon } from "/assets/icons/task-success-outlined.svg";
import { Svg } from "/src/components/svgs/index.js";
import {
  StyleLayoutFlashMessage,
  StyleLayoutFmItemIcon,
  StyleLayoutFmItemMessage,
  StyleLayoutFmRoot,
} from "./Styles";

function DefaultInfoFm({ message }) {
  return (
    <StyleLayoutFlashMessage variant="info">
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <InfoIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFlashMessage>
  );
}

function DefaultWarnFm({ message }) {
  return (
    <StyleLayoutFlashMessage variant="warning">
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <WarningIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFlashMessage>
  );
}

function DefaultErrorFm({ message }) {
  return (
    <StyleLayoutFlashMessage variant="error">
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <ErrorIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFlashMessage>
  );
}

function DefaultSuccessFm({ message }) {
  return (
    <StyleLayoutFlashMessage variant="success">
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <SuccessIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFlashMessage>
  );
}

const DefaultFmRoot = React.forwardRef(({ className, ...props }, ref) => (
  <StyleLayoutFmRoot
    ref={ref}
    className={`${className || ""} flash-messages`}
    {...props}
  />
));

export {
  DefaultInfoFm,
  DefaultWarnFm,
  DefaultErrorFm,
  DefaultSuccessFm,
  DefaultFmRoot,
};
