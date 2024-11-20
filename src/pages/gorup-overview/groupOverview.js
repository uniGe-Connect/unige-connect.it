import React, { useState, useRef, useEffect } from 'react';
import MessageBoard from './messageBoard';
import styled from 'styled-components';
import CurrentPage from '../../common/currentPage';
import SubNavBar from './subNavBar';
import Members from './members';
// import Settings from './settings';

function GroupOverview() {
    const [width, setWidth] = useState();
    const widthRef = useRef(null);

    useEffect(() => {
        const wholeElement = widthRef.current.getBoundingClientRect();
        setWidth(wholeElement.width);
        console.log(wholeElement.width, width);
    }, [width]);

  return (
    <Container>
        <CurrentPage text="Dashboard > DOPE Aerospace - UniGe" />
        <SubNavBar />
        <SubContainer ref={widthRef} id="subContainer">
            <MessageBoard />
            <Members />
            {/* <Settings /> */}
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
    background-color: blue;
    width: 70vw;
    overflow: hidden;
`;

export default GroupOverview;
