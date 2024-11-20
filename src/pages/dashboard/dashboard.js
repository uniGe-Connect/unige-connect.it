import UserNav from '../../common/user_nav';
import NavigationBar from '../dashboard/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import DashTab from './dash_tab';
import MyGroups from './my_groups_tab';
import Notifications from './notifications_tab';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const navLinks = [
        { path: 'dashboard', name: 'Dashboard' },
        { path: 'my', name: 'My Groups' },
        { path: 'notifications', name: 'Notifications' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <DashTab />;
            case 'My Groups':
                return <MyGroups />;
            case 'Notifications':
                return <Notifications />;
            default:
                return <DashTab />;
        }
    };

    return (
            <Container>
                <UserNav />
                <NavigationBar links={navLinks} onLinkClick={(key) => setActiveTab(key)} activeTab={activeTab} />
                <Content>
                    {renderContent()}
                </Content>
            </Container>)
        ;
    }

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    margin: auto;
    width: 100%;
    padding-top: 25px;
`;

export default Dashboard;
