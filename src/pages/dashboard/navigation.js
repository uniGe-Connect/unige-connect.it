import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavigationBar = ({ links, onLinkClick, activeTab }) => {
    return (
        <NavBar>
            {links.map((link) => (
                <StyledLink key={link.path} to={link.path}
                            onClick={() => onLinkClick(link.name)}
                            className={activeTab === link.name ? 'active' : ''}>
                    {link.name}
                </StyledLink>
            ))}
        </NavBar>
    );
};

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 60px;
    height: 50px;
    width: 70%;
    margin: auto;
    font-family: 'Fira Sans';
    border-bottom: 1px solid var(--gray);
`;

const StyledLink = styled(NavLink)`
    color: var(--blue);
    text-decoration: none;
    font-size: 1.2rem;
    padding: 15px 0px;

    &.active {
        border-bottom: 2px solid var(--blue);
    }
`;

export default NavigationBar;
