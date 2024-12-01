import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavigationBar = ({ activeTab = 'Groups' }) => {
    return (
        <NavBar>
            <StyledLink to='/dashboard/Groups' className={activeTab === 'Groups' ? 'active' : ''}>
                Groups
            </StyledLink>
            <StyledLink to='/dashboard/Dashboard' className={activeTab === 'Dashboard' ? 'active' : ''}>
                Dashboard
            </StyledLink>
            <StyledLink to='/dashboard/Notifications' className={activeTab === 'Notifications' ? 'active' : ''}>
                Notifications
            </StyledLink>
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

    @media (max-width: 575px) {
        gap: 20px;
        height: auto;
        width: 80%;
        align-items: flex-end;
    }
`;

const StyledLink = styled(NavLink)`
    color: var(--blue);
    text-decoration: none;
    font-size: 18px;
    padding: 15px 0px;

    &.active {
        border-bottom: 2px solid var(--blue);
    }
    
    @media (max-width: 575px) {
        font-size: 14px;
    }
`;

export default NavigationBar;
