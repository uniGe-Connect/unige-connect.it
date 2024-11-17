import UserNav from '../../common/user_nav';
import Navigation from '../dashboard/navigation';
import DashTab from '../dashboard/dash_tab';
import React from 'react';
import styled from 'styled-components';

function Dashboard() {
    return (
        <Container>
            <UserNav />
            <Navigation />
            <DashTab />
        </Container>)
        ;
    }

const Container = styled.div`
`;

export default Dashboard;
