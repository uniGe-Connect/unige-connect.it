import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function SubNavBar() {
    const [sliderPosition, setSliderPosition] = useState();
    const [sliderWidth, setSliderWidth] = useState();
    const elementRef = useRef(null);
    const firstElementRef = useRef(null);

    const handleCheckPosition = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const wholeElement = elementRef.current.getBoundingClientRect();
        setSliderWidth(rect.width);
        setSliderPosition(rect.left - wholeElement.left);
      };

    useEffect(() => {
        const rect = firstElementRef.current.getBoundingClientRect();
        const wholeElement = elementRef.current.getBoundingClientRect();
        setSliderWidth(rect.width);
        setSliderPosition(rect.left - wholeElement.left);
    }, []);

  return (
    <Container>
        <ElementContainer ref={elementRef}>
            <Element ref={firstElementRef} onClick={handleCheckPosition}>Message Board</Element>
            <Element onClick={handleCheckPosition}>Members</Element>
            <Element onClick={handleCheckPosition}>Settings</Element>
        </ElementContainer>
        <SliderContainer>
            <Slider width={sliderWidth} position={sliderPosition} />
        </SliderContainer>
    </Container>
  );
}

const Container = styled.div`
`;

const Slider = styled.div`
    position: absolute;
    left: ${props => props.position}px;
    background-color: var(--blue);
    transition: all 0.3s ease;
    width: ${props => props.width}px;   
    height: 100%;
`;

const ElementContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4vw;
    padding: 10px;
`;

const Element = styled.div`
    cursor: pointer;
    color: #002677;
    text-align: center;
    font-family: "Fira Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`;

const SliderContainer = styled.div`
    position: relative;
    background-color: var(--light-gray);
    height: 4px;
    width: 100%;
`;

export default SubNavBar;
