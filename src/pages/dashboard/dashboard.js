import UserNav from '../../common/user_nav';
import NavigationBar from '../dashboard/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import DashTab from './dash_tab';
import Notifications from './notifications_tab';
import GroupsPage from '../groups/your-groups/yourGroups';
import Footer from '../../common/footer';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const navLinks = [
        { path: 'dashtab', name: 'Dashboard' },
        { path: 'my', name: 'My Groups' },
        { path: 'notifications', name: 'Notifications' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <DashTab />;
            case 'My Groups':
                return <GroupsPage />;
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
                <Footer />
            </Container>)
        ;
    }

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    margin: auto;
    width: 100%;
    padding-top: 25px;
`;

export default Dashboard;
