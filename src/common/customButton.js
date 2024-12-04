import React from 'react';
import styled from 'styled-components';

function CustomButton(props) {
  return (
    <Container>
        <Label>
            {props.label}
        </Label>
        <NewButton onClick={props.onClick} backgroundColor={props.backgroundColor}>
            {props.name}
        </NewButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3vw;
`;

const Label = styled.label`
  color: black;
  text-align: center;
  font-family: "Fira Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const NewButton = styled.button`
  cursor: pointer;
  background-color: ${props => props.backgroundColor};
  color: white;
  border: none;
  padding: 10px 50px;
  border-radius: 5px;

  font-size: 16px;
  font-weight: 600;
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default CustomButton;
