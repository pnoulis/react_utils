import * as React from 'react';
import styled from 'styled-components';
import {
  AncestorDimensions
} from "../components/misc/AncestorDimensions";

const StyleContainer = styled.div`
display: flex;
flex-flow: column nowrap;
gap: 20px;
font-size: 1rem;
`;

const StyleOne = styled.div`
box-sizing: content-box;
width: 50px;
height: 50px;
padding: 5px;
border: 5px solid transparent;
margin: 5px;
background-color: red;
`;

const StyleChild = styled.div`
background-color: red;
width: ${({width}) => width};
height: ${({height}) => height};
overflow: auto;
`;

export default function ScratchAncestorDimensions() {
  return (
    <div>
      <h1>Scratch Ancestor Dimensions</h1>
      <div>
        <StyleContainer>
            <StyleOne id='one'>
              <AncestorDimensions ancestor="#one">
                <StyleChild>
                  <p>one</p>
                <p>one</p>
                <p>one</p>
                <p>one</p>
                </StyleChild>
              </AncestorDimensions>
            </StyleOne>
        </StyleContainer>
      </div>
    </div>
  );
}
