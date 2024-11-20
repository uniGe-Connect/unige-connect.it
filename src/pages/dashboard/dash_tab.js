import styled from 'styled-components';
import Search from '../../svgs/searchicon.svg';
import Filter from '../../svgs/filter.svg';
import { Button } from 'semantic-ui-react';

function DashTab() {
  return (
    <Container>
        <SearchBox>
                <SearchIcon src={Search} />
                <SearchInput placeholder="Search..." />
                <FilterIcon src={Filter} />
        </SearchBox>
        <ContentContainer>
            <ActionContainer>
                <Text> Search groups or create yours </Text>
                <CustomButton> Create Group </CustomButton>
            </ActionContainer>
        </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
    margin: auto;
    width: 70%;
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
        width: 50% !important;
        font-size: 14px !important;
    }
    `;

export default DashTab;
