import React, { useEffect, useContext } from 'react';
import MessageCard from './messageCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getApiClient, makeStandardApiErrorHandler } from '../../server/get_api_client';
import { LoaderContext } from '../../contexts/loader_context';

function MessageBoard(props) {
    const { setLoader } = useContext(LoaderContext);
    const navigation = useNavigate();
    useEffect(() => {
        setLoader(true);
        getApiClient().getGroupInfo(props.groupId).then(res => {
            props.setData(res.data);
        }
        )
        .catch(makeStandardApiErrorHandler(() => navigation('/dashboard')))
        .finally(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Container leftAmount={props.width}>
        <TopSection>
            <Header>
                Message Board
            </Header>
            <CustomButton>
                New Message
            </CustomButton>
        </TopSection>
        {props.data &&
        <>
            <MessageCard header="Updates on 14 May" text="DOPE Aerospace stands as a dynamic student-driven initiative propelling aerospace progress. Our core focus revolves around democratising aerospace technologies for greater accessibility, flexibility, and reliability." user="John Doe" date="12/12/2021" />
            <MessageCard header="Updates on 14 May" text="DOPE Aerospace stands as a dynamic student-driven initiative propelling aerospace progress. Our core focus revolves around democratising aerospace technologies for greater accessibility, flexibility, and reliability." user="John Doe" date="12/12/2021" />
        </>}
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    height: 90vh;
    left: ${props => props.leftAmount}px;
    transition: left 0.5s ease;
    gap: 20px;
    width: 70vw;
    overflow: auto;
`;

const TopSection = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 574px){
        flex-direction: column-reverse;
    }
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
