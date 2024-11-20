import React from 'react';
import styled from 'styled-components';

function Members(props) {
  return (
    <Container rightAmount={props.size}>members</Container>
  );
}

const Container = styled.div`
    display: flex;
    position: absolute;
    background-color: yellow;
    right: 1000px;
    width: 70vw;
    flex-direction: column;
    min-height: 90vh;
    gap: 20px;
`;

export default Members;
