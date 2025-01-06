import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import { useContext, useState, useEffect } from 'react';
import { LoaderContext } from '../../../contexts/loader_context';
import RequireProfAccess from '../../../permissions/RequireProfAccess';
import StatisticCard from './statisticCard';

function ProfessorStatistics() {
    const [data, setData] = useState();
    const { setLoader } = useContext(LoaderContext);
    useEffect(() => {
        setLoader(true);
        getApiClient().getProfStatistics().then((response) => {
            setData(response.data);
        }
        )
            .catch(makeStandardApiErrorHandler((error) => console.log(error)))
            .finally(() => setLoader(false));
    }, [setLoader]);
    return (
        <Container>
            <ContentContainer aria-label="professor-statistics">
            {(!data || data.length === 0) &&
                    <ActionContainer>
                        <Text> There are no groups associated to your courses </Text>
                    </ActionContainer>}
                {data && data.map((data) => {
                    return (
                        <StatisticCard key={data.course_id} data={data} />
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

export default RequireProfAccess(ProfessorStatistics);
