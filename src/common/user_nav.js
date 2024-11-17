import React, { useState } from 'react';
import styled from 'styled-components';
import UnigeLogo from '../svgs/UnigeConnect.svg';
import ArrowIcon from '../svgs/arrow.svg';

function UserNav() {
    const [click] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Container>
            <Logo src={UnigeLogo} />
            <NavContainer Active={click}>
                <DropdownContainer>
                    <DropdownHeader onClick={toggleDropdown}>
                        <HeaderText>Guest</HeaderText>
                        <Arrow src={ArrowIcon} isOpen={isOpen} />
                    </DropdownHeader>
                    {isOpen && (
                        <DropdownMenu>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Support</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </DropdownMenu>
                    )}
                </DropdownContainer>
            </NavContainer>
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

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const HeaderText = styled.div`
    font-family: 'Fira Sans';
    font-size: 18px;
    color: #FFF;
`;

const Arrow = styled.img`
    margin-left: 15px;
    height: 25px;
    transition: transform 0.3s ease;
    transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 130%;
    left: 0;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
    overflow: hidden;
`;

const MenuItem = styled.div`
    padding: 10px 20px;
    font-family: 'Fira Sans';
    font-size: 16px;
    color: var(--blue);
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }
`;
export default UserNav;
