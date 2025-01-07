import Nav from '../../../common/nav';
import ProfessorNavigationBar from './professorNavigation';
import React from 'react';
import styled from 'styled-components';
import Footer from '../../../common/footer';
import RequireProfAccess from '../../../permissions/RequireProfAccess';
import { useParams } from 'react-router-dom';
import ProfessorGroups from './professorGroups';
import ProfessorMyGroups from './professorMyGroups';
import ProfessorStatistics from './professorStatistics';

function ProfessorDashboard() {
    const { tab } = useParams('Groups');
    const renderContent = () => {
        switch (tab) {
            case 'Groups':
                return <ProfessorGroups />;
            case 'Dashboard':
                return <ProfessorMyGroups />;
            case 'Statistics':
                return <ProfessorStatistics />;
            default:
                return <ProfessorGroups />;
        }
    };

    return (
        <>
            <Nav />
            <Container>
                <ProfessorNavigationBar activeTab={tab} />
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

export default RequireProfAccess(ProfessorDashboard);
