import React from 'react';
import styled from 'styled-components';

function Settings() {
  return (
    <Container>settings</Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    
    gap: 20px;
`;

export default Settings;
