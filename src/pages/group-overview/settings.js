import React, { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import CustomButton from '../../common/customButton';
import { Modal, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { getApiClient, makeStandardApiErrorHandler } from '../../server/get_api_client';
import { LoaderContext } from '../../contexts/loader_context';
import UpdateGroupModal from './updateGroupModal';
import { toast, Toaster } from 'react-hot-toast';

function Settings(props) {
  const navigation = useNavigate();
  const { setLoader } = useContext(LoaderContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCourse, setNewGroupCourse] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('');

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
      setLoader(true);
      getApiClient().deleteGroup(props.groupId).then(res => {
        navigation('/dashboard');
      }).catch(makeStandardApiErrorHandler(error => console.log(error)))
          .finally(() => setLoader(false));
    } else {
      setError(true);
    }
  }, [input, props.groupId, navigation, setLoader]);

  const handleUpdateClick = useCallback(() => {
    setIsUpdateModalOpen(true);
  }, [setIsUpdateModalOpen]);

  const handleUpdateModalClose = useCallback(() => {
    setIsUpdateModalOpen(false);
  }, [setIsUpdateModalOpen]);

  const handleUpdateGroup = useCallback(() => {
    setLoader(true);
    getApiClient().updateGroup(props.groupId, {
      name: newGroupName,
      course_id: newGroupCourse,
      description: newGroupDescription,
      type: newGroupType
    }).then(() => {
      toast.success('Group updated successfully');
      handleUpdateModalClose();
      window.location.reload();
    }).catch((error) => {
      if (error.response.status === 403) {
        toast.error('You are not authorized to update this group');
      } else if (error.response.status === 400) {
        toast.error('You can only update the group every 10 minutes');
      } else {
        console.log(error);
      }
    })
        .finally(() => setLoader(false));
  }, [setLoader,
    props.groupId, newGroupName, newGroupCourse, newGroupDescription, newGroupType, handleUpdateModalClose]);

  const leaveGroup = useCallback(() => {
    setLoader(true);
    getApiClient().leaveGroup(props.groupId)
        .then(res => {
          toast.success('Successfully left the group!');
          setTimeout(() => {
            navigation('/dashboard/Dashboard');
          }, 2000);
        })
        .catch(error => {
          let errorMessage = 'An error occurred while leaving the group.';
          if (error?.response?.data?.detail) {
            errorMessage = error.response.data.detail;
          }
          toast.error(errorMessage);
          console.error('API Error:', error);
        })
        .finally(() => setLoader(false));
  }, [props.groupId, navigation, setLoader]);

  return (
      <>
        <Container leftAmount={props.width}>
          <Toaster position='top-center' reverseOrder={true} />
          <CustomButton onClick={handleOnClick} label='Delete Group:' backgroundColor='var(--red)' name='Delete' />
          <CustomButton onClick={handleUpdateClick} label='Update Group:' backgroundColor='var(--blue)' name='Update' />
          <CustomButton onClick={leaveGroup} label='Leave Group:' backgroundColor='var(--blue)' name='Leave' />
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
        <UpdateGroupModal isOpen={isUpdateModalOpen}
                          onClose={handleUpdateModalClose}
                          groupId={props.groupId}
                          newGroupName={newGroupName}
                          setNewGroupName={setNewGroupName}
                          newGroupCourse={newGroupCourse}
                          setNewGroupCourse={setNewGroupCourse}
                          newGroupDescription={newGroupDescription}
                          setNewGroupDescription={setNewGroupDescription}
                          newGroupType={newGroupType}
                          setNewGroupType={setNewGroupType}
                          errorMessage={error ? 'Error updating group' : ''}
                          onCreate={handleUpdateGroup} />
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

  @media screen and (max-width: 720px) {
    width: 90vw;
  }
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
