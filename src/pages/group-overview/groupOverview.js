import React, { useState, useRef, useEffect } from 'react';
import MessageBoard from './messageBoard';
import styled from 'styled-components';
import CurrentPage from '../../common/currentPage';
import SubNavBar from './subNavBar';
import Members from './members';
import Settings from './settings';
import { useParams } from 'react-router-dom';
import Footer from '../../common/footer';
import Nav from '../../common/nav';
import RequireUserAccess from '../../permissions/RequireUserAccess';

function GroupOverview() {
    const [width, setWidth] = useState();
    const [step, setStep] = useState(0);
    const [data, setData] = useState();
    const [membersData, setMembersData] = useState([]);
    const { groupId } = useParams();
    const widthRef = useRef(null);

    useEffect(() => {
        const handleWidth = () => {
            if (widthRef.current) {
                const wholeElement = widthRef.current.getBoundingClientRect();
                setWidth(wholeElement.width);
            }
        };
        handleWidth();
        window.addEventListener('resize', handleWidth);
        return () => window.removeEventListener('resize', handleWidth);
    }, []);

    return (
        <>
            <Nav />
            <Container>
                <CurrentPage text={`Dashboard > ${data ? data.name : ''}`} />
                <Description>
                    {data && data.description}
                </Description>
                <SubNavBar membersCount={membersData.count} step={step} setStep={setStep} />
                <SubContainer ref={widthRef}>
                    <MessageBoard data={data} setData={setData}
                        groupId={groupId} width={step === 0 ? 0 : step === 1 ? -width : 2 * -width} />
                    <Members groupId={groupId}
                        data={membersData.data} setData={setMembersData}
                        width={step === 0 ? width : step === 1 ? 0 : -width} />
                    <Settings groupId={groupId} width={step === 0 ? 2 * width : step === 1 ? width : 0} />
                </SubContainer>
            </Container>
            <Footer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5vh 15vw;
    gap: 20px;

    @media screen and (max-width: 720px) {
        padding: 5vh 5vw;
    }
`;

const SubContainer = styled.div`
    display: flex;
    position: relative;
    width: 70vw;
    min-height: 90vh;
    overflow: hidden;

    @media screen and (max-width: 720px) {
        width: 90vw;
    }
`;

const Description = styled.div`
    color: black;
    font-family: "Fira Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    padding: 20px 0px;
`;

export default RequireUserAccess(GroupOverview);
