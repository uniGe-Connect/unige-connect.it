import React, { useState } from 'react';
import { Button, Modal, Form, Header, Icon, Input, TextArea, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from "../../server/get_api_client"
import WrapperCard from './wrapper_card';
import Nav from '../../common/nav';
import Heading from '../../common/heading';

const initialGroups = [
  { id: 1, name: 'React Developers', topic: 'React', description: 'A group for React enthusiasts', type: 'public_open' },
  { id: 2, name: 'Node.js Experts', topic: 'Backend Development', description: 'A group for Node.js developers', type: 'public_closed' },
  { id: 3, name: 'Web Designers', topic: 'Design', description: 'A group for creative designers', type: 'private' },
];

const AAAA = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('public_open')
  const [errorMessage, setErrorMessage] = useState('');

  // Send POST request to backend
// put async await

const handleCreateGroup = () => {
  if (!newGroupName || !newGroupTopic || !newGroupDescription) {
    setErrorMessage('All fields are required!');
    return; // Prevent form submission
  }
  setErrorMessage('');
  
  const newGroup = {
    id: -1,
    name: newGroupName,
    topic: newGroupTopic,
    description: newGroupDescription,
    type: newGroupType,
    created_by: 1, // Assuming the logged-in user has ID 1
  };

  try {
    // Ensure that createGroup resolves before continuing with the logic
    // may be not correct
    const updatedGroup = createGroup(newGroup); 

    // Now that we have the updated group, we can safely check its ID
    if (updatedGroup.id < 0) { // checks after db call
      alert('Error while creating group');
    } else {
      setGroups([...groups, updatedGroup]);
    }

    // Close the modal and reset the form
    setIsCreateModalOpen(false);
    resetForm();
  } catch (error) {
    console.error('Error creating group:', error);
    alert('Error creating group');
  }
};

  const resetForm = () => {
    setNewGroupName('');
    setNewGroupTopic('');
    setNewGroupDescription('');
    setNewGroupType('public_open');
  };

  const handleModalCancel = () => {
    setIsCreateModalOpen(false);
    resetForm();
  }

  return (
    <GroupPage>
      <Heading />
      <Nav />
      <Title>Your groups</Title>

      {/* Button to open the Create Group Modal */}
      <IconButton primary icon="add" onClick={() => setIsCreateModalOpen(true)} floated="right">
        <Icon name="add" />
        Create Group
      </IconButton>

      {/* Display groups */}
      <GroupContainer>
        {groups.length === 0 ? (
          <p>No groups available</p>
        ) : (
          groups.map((group) => (
            <WrapperCard group={group} />
          ))
        )}
      </GroupContainer>

      {/* Modal for creating a new group */}
      <Modal
        open={isCreateModalOpen}
        onClose={handleModalCancel}
        size="small"
      >
        <Modal.Header>Create New Group</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Field>
              <FormLabel>Group Name</FormLabel>
              <Input
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                required
              />
            </Form.Field>

            <Form.Field>
              <FormLabel>Group Topic</FormLabel>
              <Input
                placeholder="Enter group topic"
                value={newGroupTopic}
                onChange={(e) => setNewGroupTopic(e.target.value)}
                required
              />
            </Form.Field>

            <Form.Field>
              <FormLabel>Group Description</FormLabel>
              <TextArea
                placeholder="Enter group description"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                maxLength={300}
                required
              />
              <div style={{ fontSize: '12px', color: 'gray' }}>
                {newGroupDescription.length}/300 characters
              </div>
            </Form.Field>
            {errorMessage && <p style={{ color: 'red', fontSize: '16px' }}><strong>{errorMessage}</strong></p>}
            <Form.Field>
              <FormLabel>Group Type</FormLabel>
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Public Open'
                name='checkboxRadioGroup'
                value='public_open'
                checked={newGroupType === 'public_open'}
                onChange={(e, data) => setNewGroupType(data.value)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Public Closed'
                name='checkboxRadioGroup'
                value='public_closed'
                checked={newGroupType === 'public_closed'}
                onChange={(e, data) => setNewGroupType(data.value)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Private'
                name='checkboxRadioGroup'
                value='private'
                checked={newGroupType === 'private'}
                onChange={(e, data) => setNewGroupType(data.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <DangerButton
            negative
            onClick={() => handleModalCancel()}
          >
            Cancel
          </DangerButton>
          <MainButton
            positive
            onClick={() => handleCreateGroup()}
          >Create Group
          </MainButton>
        </Modal.Actions>
      </Modal>
    </GroupPage >
  );
};

const GroupPage = styled.div`
  margin: 20px;
`;

const GroupContainer = styled.div`
  padding: 0px;
`;

const Title = styled(Header).attrs({
  as: 'h1', // Ensures the Header renders as an <h1> tag
})`
  font-family: "Roboto Slab";
  margin-top: 40px;
`;

const MainButton = styled(Button).attrs(props => ({
  primary: props.primary,
  floated: "right",
}))`
  margin: 20px !important;
  background-color: var(--blue) !important;
`;

const IconButton = styled(Button).attrs(props => ({
  positive: props.positive,
  icon: props.icon,
  labelPosition: "left",
  content: props.content,
}))`
  margin: 20px !important;
  background-color: var(--blue) !important;
`;

const DangerButton = styled(Button).attrs(props => ({
  negative: props.negative,
}))`
margin: 20px !important;
background-color: var(--red) !important;
`;

const FormLabel = styled.label`
font-size: 16px !important;

`;

export default GroupsPage;
