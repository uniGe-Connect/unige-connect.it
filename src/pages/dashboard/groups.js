import styled from 'styled-components';
import Search from '../../svgs/searchicon.svg';
import Filter from '../../svgs/filter.svg';
import { Button } from 'semantic-ui-react';
import GroupCard from '../../common/group_card';
import { getApiClient, makeStandardApiErrorHandler } from '../../server/get_api_client';
import { useContext, useState, useEffect } from 'react';
import { LoaderContext } from '../../contexts/loader_context';

function Groups() {
    const [data, setData] = useState();
    const { setLoader } = useContext(LoaderContext);
    useEffect(() => {
        setLoader(true);
        getApiClient().getGroups().then((response) => {
            setData(response.data.data);
            console.log(response.data.data);
        }
        )
            .catch(makeStandardApiErrorHandler((error) => console.log(error)))
            .finally(() => setLoader(false));
    }, [setLoader]);
    return (
        <Container>
            <SearchBox>
                <SearchIcon src={Search} />
                <SearchInput placeholder="Search..." />
                <FilterIcon src={Filter} />
            </SearchBox>
            <ContentContainer>
                {!data &&
                    <ActionContainer>
                        <Text> Search groups or create yours </Text>
                        <CustomButton> Create Group </CustomButton>
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

const SearchBox = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;

const Icon = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);
`;

const SearchIcon = styled(Icon)`
    left: 10px;
`;

const SearchInput = styled.input`
    padding: 10px 40px;
    width: 100%;
    border: 1px solid var(--gray);
    border-radius: 5px;
    border-color: var(--blue);
    box-sizing: border-box;`;

const FilterIcon = styled(Icon)`
    right: 10px;
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
    margin-bottom: 40px;
    font-size: 28px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;
const CustomButton = styled(Button)`
    background-color: var(--blue) !important;
    color: white !important;
    font-family: 'Fira Sans' !important;
    font-size: 18px    !important;
    padding: 10px 20px  !important;
    border-radius: 5px  !important;
    min-height: 50px  !important;
    width: 250px !important;

    @media (max-width: 768px) {
        font-size: 14px !important;
        width: 150px !important;
    }
`;

export default Groups;
