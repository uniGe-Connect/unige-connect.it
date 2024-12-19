import React from 'react';
import styled from 'styled-components';
import Crown from '../../svgs/Crown.svg';
// import { LoaderContext } from '../../contexts/loader_context';
// import { getApiClient, makeStandardApiErrorHandler } from '../../server/get_api_client';

function Members(props) {
  // const { setLoader } = useContext(LoaderContext);
  // useEffect(() => {
  //   // setLoader(true);
  //   // getApiClient.getMembers().then(res => {
  //   //   props.setData(res.data);
  //   // }).catch(makeStandardApiErrorHandler(error => console.log(error)))
  //   // .finally(() => setLoader(false));
  // }, [props, setLoader]);
  return (
    <Container leftAmount={props.width}>
    {props.data && props.data.sort((a, b) => b.owner - a.owner).map(data => {
      return (
        <Card key={data.name}>
          {data.name} {data.owner && <img src={Crown} alt='Crown Picture' />}
        </Card>
      );
    })}
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    left: ${props => props.leftAmount}px;
    transition: left 0.5s ease;
    width: 70vw;
    flex-direction: column;
    min-height: 90vh;
    gap: 3px;

    @media screen and (max-width: 720px) {
        width: 90vw;
    }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: var(--light-gray);
  width: 100%;
  padding: 10px 15px 10px 15px;

  color: var(--blue);
  font-family: "Roboto Slab";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

export default Members;
