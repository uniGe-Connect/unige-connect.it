import React from 'react';
import styled from 'styled-components';

function CurrentPage(props) {
  return (
    <Container>
        {props.text}
    </Container>
  );
}

const Container = styled.div`
    color: #002677;
    font-family: "Roboto Slab";
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 35px;
`;

export default CurrentPage;
