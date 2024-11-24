import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../common/customButton';
import { Modal, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { getApiClient, makeStandardApiErrorHandler } from '../../server/get_api_client';

function Settings(props) {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleOnClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setInput('');
  }, [setIsOpen]);

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
    setError(false);
  }, [setInput]);

  const deleteGroup = useCallback(() => {
    if (input === 'Delete') {
      getApiClient().deleteGroup(props.groupId).then(res => {
        navigation('/dashboard');
      }).catch(makeStandardApiErrorHandler(error => console.log(error)));
    } else {
      setError(true);
    }
  }, [input, props.groupId, navigation]);

  return (
    <>
    <Container leftAmount={props.width}>
      <CustomButton onClick={handleOnClick} label='Delete Group:' backgroundColor='var(--red)' name='Delete' />
    </Container>
    <Modal open={isOpen}
      onClose={() => setIsOpen(false)}
      size='small'>
      <Modal.Header>Delete your Group</Modal.Header>
      <Modal.Content>
       <Flex>
            <Label>To be able to delete the group you have to write &quot;Delete&quot;:</Label>
            <Input error={error} value={input} onChange={handleChange} />
       </Flex>
      </Modal.Content>
      <Modal.Actions>
        <MainButton positive
          onClick={deleteGroup}>
          Delete Group
        </MainButton>
        <DangerButton negative
          onClick={handleClose}>
          Cancel
        </DangerButton>
      </Modal.Actions>
    </Modal>
    </>
  );
}

const Container = styled.div`
    display: flex;
    position: absolute;
    left: ${props => props.leftAmount}px;
    transition: left 0.5s ease;
    width: 70vw;
    flex-direction: column;
    min-height: 90vh;
    gap: 20px;
`;

const MainButton = styled(Button).attrs(props => ({
  primary: props.primary,
  floated: 'right',
}))`
  background-color: var(--red) !important;
`;

const DangerButton = styled(Button).attrs(props => ({
  negative: props.negative,
}))`
  background-color: var(--blue) !important;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.div`
  color: black;
  font-family: "Fira Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
`;

const Input = styled.input`
  padding: 10px;
  color: black;
  text-align: center;
  font-family: "Fira Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border-radius: 5px;

  border: 2px solid ${props => props.error ? 'var(--red)' : 'black'} !important;
`;

export default Settings;
