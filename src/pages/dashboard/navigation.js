import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    return (
        <Container>
            <NavContainer>
                <NavLink to=''>
                    {['Dashboard', 'My Groups', 'Notifications'].map((item, index) => (
                        <NavItem key={item} onClick={() => handleClick(index)}
                                 className={activeIndex === index ? 'active' : ''}>
                            {item}
                        </NavItem>
                    ))}
                </NavLink>
            </NavContainer>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    margin: 10px auto 20px auto; 
    padding: 10px 0;
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    border-bottom: 1px solid var(--gray);
`;

const NavLink = styled(Link)`
    display: flex;
    flex-direction: row;
    gap: 20px;
    
`;

const NavItem = styled.div`
    cursor: pointer;
    color: var(--blue);
    padding: 10px 0px;
    margin-right: 40px;
    font-family: 'Fira Sans';
    position: relative;
    &.active::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--black);
        bottom: -5px;
        left: 0;
        transition: transform 0.8s ease-in-out;
        ;
    }
`;

export default Navigation;
