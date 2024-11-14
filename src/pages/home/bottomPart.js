import React from 'react';
import styled from 'styled-components';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { Icon } from 'semantic-ui-react';

export const Card = (props) => {
    return (
        <CardContainer id={props.id} alignRight={props.alignRight}>
            <Header>{props.title} <Icon name={props.icon} /></Header>
            <Text>{props.text}</Text>
        </CardContainer>
    );
};

const Cards = [
    { title: 'Create Your Group', text: 'Post your group and make it visible to other students lookingto join.', icon: 'plus' },
    { title: 'Find Your Group', text: 'Let interested students discover and join your group effortlessly or find interested team to join.', icon: 'search' },
    { title: 'Connect & Grow', text: 'Collaborate, learn, and achieve your academic goals together or make do your course projects', icon: 'bolt' }
];

function BottomPart() {
  return (
    <Container>
        <BigHeader>
            How does it works?
        </BigHeader>
        <SubContainer>
            <Xwrapper>
                {Cards.map((data, index) => {
                    const ID = `elem${index + 1}`;
                    return (
                        <Card title={data.title} text={data.text} key={data.title}
                         id={ID} alignRight={index === 1 && true} icon={data.icon} />
                    );
                })};
                <Xarrow color="#D9D9D6" dashness={true} endAnchor="top" start='elem1' end="elem2" />
                <Xarrow color="#D9D9D6" startAnchor="bottom" dashness={true} start='elem2' end="elem3" />
            </Xwrapper>
        </SubContainer>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 100px;
    padding-bottom: 150px;
`;

const BigHeader = styled.div`
    color: var(--light-blue);
    text-align: center;
    font-family: 'Roboto Slab';
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Header = styled.div`
    color: var(--blue);
    text-align: center;
    font-family: 'Roboto Slab';
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Text = styled.div`
    color: var(--black);
    font-family: 'Fira Sans'; // Remove before merge
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 38px; /* 158.333% */
`;

const CardContainer = styled.div`
    display: flex;
    align-self: ${props => props.alignRight ? 'flex-end' : ''};
    align-items: flex-start;
    width: 400px;
    padding: 20px 0px;
    flex-direction: column;
    gap: 10px;
`;

const SubContainer = styled.div`
    display: flex;
    padding: 0px 15vw;
    flex-direction: column;
    gap: 150px;
`;

export default BottomPart;
