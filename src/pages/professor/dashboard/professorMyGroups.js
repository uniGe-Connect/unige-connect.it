import styled from 'styled-components';
import GroupCard from '../../../common/group_card';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import { useContext, useState, useEffect } from 'react';
import { LoaderContext } from '../../../contexts/loader_context';
import RequireProfAccess from '../../../permissions/RequireProfAccess';

function ProfessorMyGroups() {
    const [data, setData] = useState();
    const { setLoader } = useContext(LoaderContext);
    useEffect(() => {
        setLoader(true);
        getApiClient().getProfessorGroups().then((response) => {
            setData(response.data.data);
        }
        )
            .catch(makeStandardApiErrorHandler((error) => console.log(error)))
            .finally(() => setLoader(false));
    }, [setLoader]);
    return (
        <Container>
            <ContentContainer>
            {(!data || data.length === 0) &&
                    <ActionContainer>
                        <Text> There are no groups associated to your courses </Text>
                    </ActionContainer>}
                {data && data.map((group) => {
                    return (
                        <GroupCard key={group.id}
                            is_member={group.is_member}
                            groupId={group.id}
                            header={group.name}
                            text={group.description}
                            date={group.created_at}
                            type={group.type}
                            deleted_at={group.deleted_at}
                            member_count={group.member_count}
                            course={group.course_name} />
                    );
                })}
            </ContentContainer>
        </Container>
    );
}

const Container = styled.div`
    margin: auto;
    width: 100%;
    min-height: 85vh;
    padding: 10px 0px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 31px;
`;

const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 220px;
    align-items: center;
    width: 100%;
    border: 2px dashed var(--blue);
    background-color: var(--light-gray);
    padding: 0px 20px;
`;

const Text = styled.div`
    color: var(--blue);
    font-family: 'Fira Sans';
    font-size: 28px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export default RequireProfAccess(ProfessorMyGroups);
