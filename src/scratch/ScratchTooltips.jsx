import * as React from "react";
import styled from "styled-components";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";

export default function ScratchTooltips() {
  return (
    <div>
      <h1>scratch tooltips</h1>
      <div>
        <Tooltip>
          <TooltipTrigger>yolo</TooltipTrigger>
          <TooltipContent>remove package</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
