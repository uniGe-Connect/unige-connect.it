import styled from 'styled-components';
import { Header } from "semantic-ui-react";

const Heading = () => {

  return (
    <Title> UniGe Connect </Title>
  )
};

const Title = styled(Header).attrs({
  as: 'h1',
})`
  font-family: "Roboto Slab" !important;
  color: var(--blue) !important;
`;

export default Heading;
