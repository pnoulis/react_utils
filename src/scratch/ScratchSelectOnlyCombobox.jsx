import * as React from 'react';
import styled, {
  css
} from 'styled-components';
import {
  SelectOnlyCombobox
} from '/src/components/comboboxes/index.js';

const Combobox = SelectOnlyCombobox.Provider;
const StyleTrigger = styled(SelectOnlyCombobox.Trigger)`
  border-radius: var(--br-lg);
  height: 50px;
  width: 100%;
  height: 55px;
  padding: 0 15px;
  border-radius: var(--br-lg);
  border: 2px solid var(--black-base);
  font-size: var(--tx-md);
  letter-spacing: 1.5px;
  outline: none;
  color: black;

  &::placeholder {
    color: black;
    opacity: 1;
  }

  &:hover {
    cursor: pointer;
  }
background-color: ${(props) => 'red'}
`
const StyleListbox = styled(SelectOnlyCombobox.Listbox)`
  margin-top: 10px;
  width: 700px;
  border-top-left-radius: var(--br-lg);
  border-top-right-radius: var(--br-lg);
  background-color: var(--grey-light);
  height: 450px;
  padding: 20px 15px;
  outline: none;
  overflow: scroll;
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`
const StyleOption = styled(SelectOnlyCombobox.Option)`
  border: 4px solid transparent;
  padding: 10px 10px;
  border-radius: var(--br-md);
  background-color: ${(props) => 'red'}
`

const indicators = css`
  ${({ selected, active }) => {
    if (selected) {
      return `
background - color: pink;
`;
    } else if (active) {
      return `
background - color: green;
`;
    } else {
      return ` &
: hover {
  background - color: yellow;
} &
: focus {
  background - color: red;
}
`;
    }
  }}

  &:active {
    background-color: blue;
  }
`;

const mockData = [{
    username: "yolo1",
  },
  {
    username: "yolo2",
  },
  {
    username: "yolo3",
  },
  {
    username: "yolo4",
  },
  {
    username: "yolo5",
  },
  {
    username: "yolo6",
  },
  {
    username: "yolo7",
  },
  {
    username: "yolo8",
  },
];

export default function ScratchSelectOnlyCombobox() {
  return (
    <div>
      <h1>Scratch SelectOnlyCombobox</h1>
      <div>
        <Combobox
          name="test"
          options={mockData.map(({username}) => username)}
          onSelect={(option) => alert(option)}
        >
          <StyleTrigger yes="oteuhenouh" placeholder='select something'/>
          <StyleListbox renderOption={(props) => (<StyleOption {...props}/>)}/>
        </Combobox>
      </div>
    </div>
  );
}
