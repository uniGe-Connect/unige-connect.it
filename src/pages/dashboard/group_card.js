import styled from 'styled-components';
import UsersIcon from '../../svgs/UsersIcon.svg';
import DateIcon from '../../svgs/DateIcon.svg';
import LockIcon from '../../svgs/lockIcon.svg';
import { Button } from 'semantic-ui-react';

function GroupCard(props) {
    const button = (props) => {
        switch (props.type) {
            case 'public_closed':
                return (
                <StatusButton color='var(--black)'>
                    Group At Capacity
                </StatusButton>);
            case 'public_open' :
                return (
                    <StatusButton color='var(--blue)'>
                        Become A Member
                    </StatusButton>);
            case 'private' :
                return (
                    <InvitationOnlyElement>
                    <img src={LockIcon} />Invitation Only
                    </InvitationOnlyElement>);
            default:
                break;
        }
    };

  return (
    <Container>
        <TopSection>
            <RowContainer>
                <Header type={props.type}>
                    {props.header}
                </Header>
                {button(props)}
            </RowContainer>

            <RowContainer>
            <Flex>
                <SubFlex><Icon src={UsersIcon} /><IconText>{`${props.membersNumber} Members`}</IconText></SubFlex>
                <SubFlex><Icon src={DateIcon} /><IconText>{props.date}</IconText></SubFlex>
            </Flex>
            </RowContainer>
        </TopSection>
        <Text>
            {props.text}
        </Text>
        <Flex>
        {props.tags.map((tag) => {
           return (
            <Tag key={tag}>
            {`#${tag}`}
            </Tag>
            );
        })}
        </Flex>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    background: #F4F4F4;
    padding: 1.5vh 1.3vw;
`;

const Header = styled.div`
    color: var(--blue);
    opacity: ${props => props.type === 'private' ? 0.5 : 1};
    font-family: "Roboto Slab";
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 38px;
`;

const Text = styled.div`
    color: black;
    font-family: "Fira Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px; /* 150% */
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5vw;
`;

const SubFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const Icon = styled.img`
`;

const IconText = styled.div`
    color: var(--light-blue);
    font-family: "Fira Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px; /* 192.857% */
`;

const Tag = styled.div`
`;

const RowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: horizontal;
    width: 100%;
`;

const StatusButton = styled(Button)`
    background : ${props => props.color} !important;
    color: white !important;
    @media (max-width: 600px) {
        width: 35%;
        height: auto;
        font-size: 0.8rem;
    }
`;

const InvitationOnlyElement = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export default GroupCard;
