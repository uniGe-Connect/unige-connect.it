import React, { useState, useRef, useEffect } from 'react';
import MessageBoard from './messageBoard';
import styled from 'styled-components';
import CurrentPage from '../../common/currentPage';
import SubNavBar from './subNavBar';
import Members from './members';
import Settings from './settings';

function GroupOverview() {
    const [width, setWidth] = useState();
    const [step, setStep] = useState(0);
    const widthRef = useRef(null);

    useEffect(() => {
        const handleWidth = () => {
            const wholeElement = widthRef.current.getBoundingClientRect();
            setWidth(wholeElement.width);
        };
        handleWidth();
        window.addEventListener('resize', handleWidth);
    }, [width]);

  return (
    <Container>
        <CurrentPage text="Dashboard > DOPE Aerospace - UniGe" />
        <SubNavBar step={step} setStep={setStep} />
        <SubContainer ref={widthRef}>
            <MessageBoard width={step === 0 ? 0 : step === 1 ? -width : 2 * -width} />
            <Members width={step === 0 ? width : step === 1 ? 0 : -width} />
            <Settings width={step === 0 ? 2 * width : step === 1 ? width : 0} />
        </SubContainer>
    </Container>
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

export default GroupOverview;
