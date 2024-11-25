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
        <SubNavBar step={step} setStep={setStep} />
        <SubContainer ref={widthRef}>
            <MessageBoard data={data} setData={setData}
            groupId={groupId} width={step === 0 ? 0 : step === 1 ? -width : 2 * -width} />
            <Members width={step === 0 ? width : step === 1 ? 0 : -width} />
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
    gap: 25px;
    padding: 5vh 15vw;
`;

const SubContainer = styled.div`
    display: flex;
    position: relative;
    width: 70vw;
    min-height: 90vh;
    overflow: hidden;
`;

export default RequireUserAccess(GroupOverview);
