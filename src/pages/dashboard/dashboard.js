import Nav from '../../common/nav';
import NavigationBar from '../dashboard/navigation';
import React from 'react';
import styled from 'styled-components';
import Groups from './groups';
import Notifications from './notifications_tab';
import GroupsPage from './my-groups/myGroups';
import Footer from '../../common/footer';
import RequireUserAccess from '../../permissions/RequireUserAccess';
import { useParams } from 'react-router-dom';

function Dashboard() {
    const { tab } = useParams('Groups');
    const renderContent = () => {
        switch (tab) {
            case 'Groups':
                return <Groups />;
            case 'Dashboard':
                return <GroupsPage />;
            case 'Notifications':
                return <Notifications />;
            default:
                return <Groups />;
        }
    };

    return (
        <>
            <Nav />
            <Container>
                <NavigationBar activeTab={tab} />
                <Content>
                    {renderContent()}
                </Content>
            </Container>
            <Footer />
        </>);
        }

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 50px 15vw;

    @media screen and (max-width: 720px) {
        padding: 50px 5vw;
    }
`;

const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    margin: auto;
    width: 100%;
    padding-top: 25px;
`;

export default RequireUserAccess(Dashboard);
