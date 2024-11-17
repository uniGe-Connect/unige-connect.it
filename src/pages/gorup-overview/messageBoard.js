import React from 'react';
import MessageCard from './messageCard';
import styled from 'styled-components';

function MessageBoard() {
  return (
    <Container>
        <TopSection>
            <Header>
                Message Board
            </Header>
            <CustomButton>
            New Message
            </CustomButton>
        </TopSection>
        <MessageCard header="Welcome to group" text="DOPE Aerospace stands as a dynamic student-driven initiative propelling aerospace progress. Our core focus revolves around democratising aerospace technologies for greater accessibility, flexibility, and reliability." user="John Doe" date="12/12/2021" />
        <MessageCard header="Updates on 14 May" text="DOPE Aerospace stands as a dynamic student-driven initiative propelling aerospace progress. Our core focus revolves around democratising aerospace technologies for greater accessibility, flexibility, and reliability." user="John Doe" date="12/12/2021" />
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    padding: 5vh 15vw;

    gap: 20px;
`;

const TopSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CustomButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 15px 50px;

    background: #002677;
    border-radius: 4px;

    color: #FFF;
    text-align: center;
    font-family: "Fira Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #25282A;
    font-family: "Roboto Slab";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 38px;
`;
export default MessageBoard;
