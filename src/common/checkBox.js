import React, { useCallback } from 'react';
import styled from 'styled-components';
import CheckMark from '../svgs/CheckMark.svg';

function CheckBox(props) {
    const handleChange = useCallback(() => {
        props.setValue(!props.value);
    }, [props]);

  return (
    <Container>
        {props.value ? <CheckedBox onClick={handleChange}><img src={CheckMark} /></CheckedBox>
        : <Box onClick={handleChange} />}
        {props.text}
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #505050;
    margin: 10px 0px;
    font-family: "Fira Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const Box = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #E1E1E1;
    cursor: pointer;
`;

const CheckedBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: var(--blue);
    border-radius: 4px;
    border: 1px solid var(--Mono-Gray-2, #E1E1E1);
    cursor: pointer;
`;

export default CheckBox;
