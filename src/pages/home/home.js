import React from 'react';
import styled from 'styled-components';
import Body from './body';
import BottomPart from './bottomPart';
function Home() {
  return (
  <Container>
    <Body />
    <BottomPart />
  </Container>);
}

const Container = styled.div`
`;

export default Home;
