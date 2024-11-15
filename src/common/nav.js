import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import UnigeLogo from '../svgs/UnigeConnect.svg';

function Nav() {
  const [click, setClick] = useState(true);

  const handleClick = useCallback(() => {
    setClick(!click);
  }, [click]);

  return (
    <Container>
      <Logo src={UnigeLogo} />
      <NavContainer Active={click}>
        <Section>
        About
        </Section>
        <Section>
        Support
        </Section>
        <Section>
        Signin
        </Section>
      </NavContainer>
      <BurgerContainer onClick={handleClick}>
        <Meat />
        <Meat />
        <Meat />
      </BurgerContainer>
    </Container>)
  ;
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  overflow-x: clip;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15vw;
  height: 10vh;
  gap: 5vw;
  background-color: var(--blue);
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
  min-width: 0px;
  transition: transform 0.5s ease;

  @media screen and (max-width: 670px){
    z-index: 100;
    position: absolute;
    flex-direction: column;
    justify-content: space-around;
    height: 50vh;
    right: 0;
    min-width: 100vw;
    top: 9vh;
    transform:  ${props => props.Active ? 'translateX(100%)' : 'translateX(0%)'};
    background: var(--blue);
  }
`;

const Logo = styled.img`
    @media screen and (max-width: 545px){
      width: 200px;
      height: auto;
    }
    @media screen and (max-width: 403pc){
      width: 160px;
      height: auto;
    }
`;

const Section = styled.div`
  color: #FFF;
  text-align: center;
  font-family: 'Fira Sans'; // Delete When Kevin Merge His Pull Request
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const BurgerContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 3px;

  @media screen and (max-width: 670px){
    display: flex;
  }

`;

const Meat = styled.div`
  background-color: white;
  height: 4px;
  width: 40px;
  border-radius: 5px
`;

export default Nav;
