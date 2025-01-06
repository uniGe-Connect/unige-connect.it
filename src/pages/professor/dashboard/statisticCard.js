import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

function StatisticCard(props) {
  return (
    <Container aria-label="professor-statistics-card">
      <Title>
        {props.data.course_name}
      </Title>
      <OuterFlexContainer>
        <InnerFlexContainer>
          <CustomCountUp className='statCard' end={props.data.total_groups} duration={3} />
          <Text>
            Total Groups
          </Text>
        </InnerFlexContainer>
        <InnerFlexContainer>
          <CustomCountUp className='statCard' end={props.data.total_members} duration={3} />
          <Text>
            Total Number Students
          </Text>
        </InnerFlexContainer>
        <InnerFlexContainer>
          <CustomCountUp className='statCard' end={props.data.avg_members} duration={3} />
          <Text>
            Avg Students <br />
          <Span>
              per group
          </Span>
          </Text>
        </InnerFlexContainer>
        <InnerFlexContainer>
          <CustomCountUp className='statCard' end={props.data.min_members} duration={3} />
          <Text>
            Number of Students <br />
            <Span>
              per smallest group
            </Span>
          </Text>
        </InnerFlexContainer>
        <InnerFlexContainer>
          <CustomCountUp className='statCard' end={props.data.max_members} duration={3} />
          <Text>
            Number of Students <br />
            <Span>
              per largest group
            </Span>
          </Text>
        </InnerFlexContainer>
      </OuterFlexContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: var(--light-gray);
  padding: 1.5vh 1.3vw;

  @media screen and (max-width: 583px) {
      padding: 1.5vh 5vw;
  }
`;

const Title = styled.div`
  color: #002677;
  font-family: "Roboto Slab";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  @media screen and (max-width: 700px) {
    font-size: 28px;
  }
`;

const OuterFlexContainer = styled.div`
  display: flex;
  padding: 0px 20px 0px 20px;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InnerFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CustomCountUp = styled(CountUp)`
  color: #002677;
  text-align: center;
  font-family: "Fira Sans";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  @media screen and (max-width: 700px) {
    font-size: 45px;
  }
`;

const Text = styled.div`
  color: #000;
  font-family: "Roboto Slab";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  white-space: nowrap;
  @media screen and (max-width: 700px) {
    font-size: 13px;
  }
`;

const Span = styled.span`
  color: #000;
  font-family: "Roboto Slab";
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;

export default StatisticCard;
