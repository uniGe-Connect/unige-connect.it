import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ProfessorNavigationBar = ({ activeTab = 'Groups' }) => {
    const tabs = [
        { name: 'Groups', path: '/professor/dashboard/Groups' },
        { name: 'Dashboard', path: '/professor/dashboard/Dashboard' }
    ];

    return (
        <NavBar>
            {tabs.map(({ name, path }) => (
                <StyledLink key={name} to={path} className={activeTab === name ? 'active' : ''}>
                    {name}
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
    width: 100%;
    margin: auto;
    font-family: 'Fira Sans';
    border-bottom: 1px solid var(--gray);

    @media (max-width: 575px) {
        gap: 20px;
        height: auto;
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

export default ProfessorNavigationBar;
