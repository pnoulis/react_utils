import * as React from "react";
import styled from "styled-components";
import { Svg } from "/src/components/svgs/index.js";
import { ReactComponent as PlayerIcon } from "agent_factory.shared/ui/icons/add_player.svg";

const StyleSvg = styled(Svg)`
  width: 100px;
  fill: red;
`;
export default function ScratchSvgs() {
  return (
    <div>
      <h1>Scratch svgs</h1>
      <div>
        <Svg size="40px">
          <PlayerIcon />
        </Svg>
        <StyleSvg>
          <PlayerIcon />
        </StyleSvg>
      </div>
    </div>
  );
}
