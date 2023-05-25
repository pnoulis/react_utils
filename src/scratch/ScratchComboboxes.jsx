import * as React from "react";
import styled from "styled-components";

import { AsyncSearchableCombobox as Combo } from "/src/components/comboboxes/index.js";

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

const mockLabels = mockData.map((d) => d.username);
const getLabels = (options) => options.map((option) => option.username);

const recMockData = () => {
  const a = new Map();
  mockData.forEach((opt) => a.set(opt.username, opt));
  return a;
};

const asyncMockData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const a = new Map();
      mockData.forEach((opt) => a.set(opt.username, opt));
      resolve(a);
    }, 1500);
  });
};

const Combobox = Combo.Provider;
const StyleTrigger = styled(Combo.Trigger)`
  background-color: green;
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
`;
const StyleListbox = styled(Combo.Listbox)`
  margin-top: 10px;
  width: 700px;
  border-top-left-radius: var(--br-lg);
  border-top-right-radius: var(--br-lg);
  background-color: var(--grey-light);
  height: 450px;
  padding: 20px 15px;
  outline: none;
  overflow: auto;
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`;
const StyleOption = styled(Combo.Option)`
  border: 4px solid transparent;
  padding: 10px 10px;
  border-radius: var(--br-md);
  background-color: white;

  ${({ selected, active }) => {
    if (selected) {
      return `
border-color: var(--success-base);
`;
    } else if (active) {
      return `
border-color: var(--primary-medium);
cursor: pointer;
`;
    } else {
      return `
  &:hover {
    cursor: pointer;
    border-color: var(--primary-medium);
  }
`;
    }
  }}
`;

export default function ScratchCombobox() {
  return (
    <div>
      <h1>Scratch Comboboxes</h1>
      <div>
        <Combobox
          name="boundEditableListCombobox"
          options={asyncMockData}
          onSelect={(option) => console.log(option)}
        >
          <StyleTrigger placeholder="select player" />
          <StyleListbox
            renderOnEmpty={<p>empty</p>}
            renderOption={(props) => <StyleOption {...props} />}
          />
        </Combobox>
      </div>
    </div>
  );
}
