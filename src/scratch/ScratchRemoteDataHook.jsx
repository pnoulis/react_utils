import {
  RemoteDataProvider,
  useRemoteData,
  RemoteDataStates,
} from "/src/hooks/useRemoteData.jsx";
import styled from "styled-components";
import { ReactComponent as SuccessIcon } from "/assets/icons/success_icon_filled.svg";
import { ReactComponent as FailedIcon } from "/assets/icons/warning_icon_filled.svg";
import { Svg } from "/src/components/svgs/index.js";
import { MoonLoader } from "react-spinners";

const mockData = [
  {
    username: "yolo1",
    age: 1,
  },
  {
    username: "yolo2",
    age: 2,
  },
  {
    username: "yolo3",
    age: 3,
  },
  {
    username: "yolo4",
    age: 4,
  },
  {
    username: "yolo5",
    age: 5,
  },
  {
    username: "yolo6",
    age: 6,
  },
  {
    username: "yolo7",
    age: 7,
  },
  {
    username: "yolo8",
    age: 8,
  },
];

function getMockData() {
  return new Promise((resolve, reject) => {
    resolve(mockData);
  });
}

const StyleSuccessIcon = styled(Svg)`
  fill: green;
  pointer-events: none;
  height: 40px;
  width: 40px;
`;

const StyleFailIcon = styled(Svg)`
  fill: red;
  pointer-events: none;
  height: 40px;
  width: 40px;
`;

const StyleMoonLoader = () => <MoonLoader loading color="blue" size={40} />;

export default function ScratchRemoteDataHook() {
  const remoteData = useRemoteData({
    getRemoteData: getMockData,
  });

  return (
    <div>
      <h3>Scratch remote data hook</h3>
      <div>
        <h2 onClick={() => remoteData.startFetching()}>start fetching</h2>
        <RemoteDataProvider value={remoteData}>
          <RemoteDataStates
            RenderPending={<StyleMoonLoader loading color="blue" size={40} />}
            RenderSuccess={
              <StyleSuccessIcon>
                <SuccessIcon />
              </StyleSuccessIcon>
            }
            RenderFailure={
              <StyleFailIcon>
                <FailedIcon />
              </StyleFailIcon>
            }
          />
        </RemoteDataProvider>
      </div>
    </div>
  );
}
