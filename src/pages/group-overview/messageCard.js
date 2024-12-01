import React from 'react';
import styled from 'styled-components';
import UserIcon from '../../svgs/UserIcon.svg';
import DateIcon from '../../svgs/DateIcon.svg';

function MessageCard(props) {
  return (
    <Container>
        <TopSection>
            <Header>
                {props.header}
            </Header>
            <Flex>
                <SubFlex><Icon src={UserIcon} /><IconText>{props.user}</IconText></SubFlex>
                <SubFlex><Icon src={DateIcon} /><IconText>{props.date}</IconText></SubFlex>
            </Flex>
        </TopSection>
        <Text>
            {props.text}
        </Text>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    background: #F4F4F4;
    padding: 1.5vh 1.3vw;

    @media screen and (max-width: 583px) {
        padding: 1.5vh 5vw;
    }
`;

const Header = styled.div`
    color: var(--blue);
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
    line-height: 27px;
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

export default MessageCard;
