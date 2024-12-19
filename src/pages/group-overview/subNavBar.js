import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

function SubNavBar({ setStep, step, membersCount }) {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const elementRef = useRef(null);
    const firstElementRef = useRef(null);
    const secondElementRef = useRef(null);
    const thirdElementRef = useRef(null);

    const updateSliderPosition = (element) => {
            const rect = element.getBoundingClientRect();
            const wholeElement = elementRef.current.getBoundingClientRect();
            setSliderWidth(rect.width);
            setSliderPosition(rect.left - wholeElement.left);
    };

    useEffect(() => {
        const handleResize = () => {
            if (elementRef.current) {
                if (step === 0 && firstElementRef.current) {
                    updateSliderPosition(firstElementRef.current);
                } else if (step === 1 && secondElementRef.current) {
                    updateSliderPosition(secondElementRef.current);
                } else if (step === 2 && thirdElementRef.current) {
                    updateSliderPosition(thirdElementRef.current);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [step]);

    const handleCheckPosition = (event) => {
        const CurrentTag = event.currentTarget.innerHTML;
        setStep(CurrentTag === 'Message Board' ? 0 : CurrentTag === 'Settings' ? 2 : 1);

        if (CurrentTag === 'Message Board') {
            updateSliderPosition(firstElementRef.current);
        } else if (CurrentTag === 'Members') {
            updateSliderPosition(secondElementRef.current);
        } else if (CurrentTag === 'Settings') {
            updateSliderPosition(thirdElementRef.current);
        }
    };

    return (
        <Container>
            <ElementContainer ref={elementRef}>
                <Element ref={firstElementRef} onClick={handleCheckPosition}>Message Board</Element>
                <Element ref={secondElementRef} onClick={handleCheckPosition}>Members
                    <Circle>{membersCount}</Circle>
                </Element>
                <Element ref={thirdElementRef} onClick={handleCheckPosition}>Settings</Element>
            </ElementContainer>
            <SliderContainer>
                <Slider width={sliderWidth} position={sliderPosition} />
            </SliderContainer>
        </Container>
    );
}

const Container = styled.div``;

const Slider = styled.div`
    position: absolute;
    left: ${(props) => props.position}px;
    background-color: var(--blue);
    transition: all 0.3s ease;
    width: ${(props) => props.width}px;
    height: 100%;
`;

const ElementContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4vw;
    padding: 10px;
`;

const Element = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: var(--blue);
    text-align: center;
    font-family: "Fira Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    white-space: nowrap;
`;

const SliderContainer = styled.div`
    position: relative;
    background-color: var(--light-gray);
    height: 4px;
    width: 100%;
`;

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light-gray);
    border-radius: 50px;

    color: var(--blue);
    text-align: center;
    font-family: "Fira Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;

    width: 20px;
    height: 20px;
`;

export default SubNavBar;
