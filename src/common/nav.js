import React, { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import UnigeLogo from '../svgs/UnigeConnect.svg';
import ArrowIcon from '../svgs/arrow.svg';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../contexts/user_context';
import { getApiClient, makeStandardApiErrorHandler } from '../server/get_api_client';
import { USER_TYPE } from '../Enum/userType';

function Nav() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const [click, setClick] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
};
  const handleClick = useCallback(() => {
    setClick(!click);
  }, [click]);

  const handleSignIn = useCallback(() => {
    getApiClient().login().then(res => {
      window.location.href = res.data.redirect_url;
    }).catch(makeStandardApiErrorHandler(error => console.log(error)));
  }, []);

  const handleSignOut = useCallback(() => {
    getApiClient().logout().then(res => {
        window.location.href = res.data.redirect_url;
    }).catch(makeStandardApiErrorHandler(error => console.log(error)));
  }, []);

  return (
    <Container>
      <NavLink to='/'>
        <Logo src={UnigeLogo} />
      </NavLink>
      <NavContainer Active={click}>
      {!user
      ? <>
          <Section>
          About
          </Section>
          <Section>
          Support
          </Section>
          <Section onClick={handleSignIn}>
          Signin
          </Section>
        </>
        : <DropdownContainer aria-label='nav-dropdown-menu'>
            <DropdownHeader onClick={toggleDropdown}>
                <HeaderText>{(user && user.name) + ' ' + (user && user.last_name)}</HeaderText>
                <Arrow src={ArrowIcon} isOpen={isOpen} />
            </DropdownHeader>
            {isOpen && (
                <DropdownMenu>
                    <MenuItem to={user.type === USER_TYPE.STUDENT ? '/dashboard/Groups' : '/professor/dashboard'}>Dashboard</MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Support</MenuItem>
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </DropdownMenu>
            )}
          </DropdownContainer>}
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

  @media screen and (max-width: 720px) {
      padding: 0px 5vw;
  }
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
  cursor: pointer;
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
  cursor: pointer;
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

const DropdownContainer = styled.div`
    position: static;
    display: flex;
    font-family: 'Fira Sans';
    @media screen and (max-width: 500px){
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    top: 7vh;
    padding: 15px;
    right: 20vw;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
    @media screen and (max-width: 850px){
        width: 100vw;
        right: 0;
        gap: 30px;
        top: 10vh;
        padding-left: 15vw;
    }
`;

const MenuItem = styled(NavLink)`
    font-family: 'Fira Sans';
    font-size: 18px;
    color: var(--blue);
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }

    @media screen and (max-width: 850px){
        font-size: 18px;
    }
`;

export default Nav;
