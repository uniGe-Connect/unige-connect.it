import React from 'react';
import styled from 'styled-components';

function Members(props) {
  return (
    <Container leftAmount={props.width}>members</Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    left: ${props => props.leftAmount}px;
    transition: left 0.5s ease;
    width: 70vw;
    flex-direction: column;
    min-height: 90vh;
    gap: 20px;

    @media screen and (max-width: 720px) {
        width: 90vw;
    }
`;

export default Members;
