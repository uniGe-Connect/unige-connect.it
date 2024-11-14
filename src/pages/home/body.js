import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import People from '../../svgs/people.svg';

function Body() {
  return (
    <Container>
        <LeftSection>
            <Header>
                Connect, Collaborate, and grow.
            </Header>
            <Text>
                Join a community where students connect to achieve their
                academic goals. Collaborate on projects, build study groups,
                and conquer challenges together.
            </Text>
            <CustomButton>CONNECT NOW</CustomButton>
        </LeftSection>
        <RightSection src={People} />
    </Container>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); 
    gap: 5vw;
    padding: 0px 5vw;
    align-content: center;
    width: 100vw;
    min-height: 90vh;

    @media screen and (max-width: 566px){
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    }
    @media screen and (max-width: 480px){
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    }
    @media screen and (max-width: 375px){
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    }

`;
const LeftSection = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

  @media screen and (max-width: 1178px){
    padding: 10vh 10vw;
  }
`;

const RightSection = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;

  @media screen and (max-width: 1178px){
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Header = styled.div`  
    color: var(--blue);
    text-align: left;
    font-family: "Roboto Slab";
    font-weight: 700;
    font-size: 48px;
    line-height: 52px;

    @media screen and (max-width: 736px){
        font-size: 32px;
  }
`;

const Text = styled.div`
    color: var(--black);
    font-family: "Fira Sans";
    font-size: 24px;
    line-height: 32px;
`;

const CustomButton = styled(Button)`
    background: var(--blue) !important;
    color: white !important;
    width: 225px;
    min-height: 50px !important;

    @media screen and (max-width: 1178px){
      width: 100%;
    }
`;

export default Body;
