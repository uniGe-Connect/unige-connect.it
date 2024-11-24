import React from 'react';
import styled from 'styled-components';
import Body from './body';
import BottomPart from './bottomPart';
import Nav from '../../common/nav';
import Footer from '../../common/footer';

function Home() {
  return (
  <Container>
    <Nav />
    <Body />
    <BottomPart />
    <Footer />
  </Container>);
}

const Container = styled.div`
`;

export default Home;
