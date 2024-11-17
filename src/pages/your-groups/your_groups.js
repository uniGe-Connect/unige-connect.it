import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Form, Header, Icon, Input, TextArea, Checkbox } from 'semantic-ui-react';
import './your_groups.css'

const initialGroups = [
  { id: 1, name: 'React Developers', topic: 'React', description: 'A group for React enthusiasts', type: 'public_open' },
  { id: 2, name: 'Node.js Experts', topic: 'Backend Development', description: 'A group for Node.js developers', type: 'public_closed' },
  { id: 3, name: 'Web Designers', topic: 'Design', description: 'A group for creative designers', type: 'private' },
];

const GroupsPage = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('public_open')
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateGroup = async () => {

    if (!newGroupName || !newGroupTopic || !newGroupDescription) {
      setErrorMessage('All fields are required!');
      return; // Prevent form submission
    }
    setErrorMessage('');
    const newGroup = {
      name: newGroupName,
      topic: newGroupTopic,
      description: newGroupDescription,
      type: newGroupType,
      created_by: 1, // Assuming the logged-in user has ID 1
    };

    try {
      // Send POST request to backend
      // const response = await axios.post('http://localhost:5000/api/groups', newGroup);

      // Add the new group to the state
      // setGroups([...groups, response.data]);
      setGroups([...groups, newGroup]);

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
    <div style={{ padding: '20px' }}>
      <Header as="h1">Groups</Header>

      {/* Button to open the Create Group Modal */}
      <Button style={{ margin: '20px' }}
        primary
        icon
        labelPosition="left"
        floated="right"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <Icon name="add" />
        Create Group
      </Button>

      {/* Display groups */}
      <div style={{ marginTop: '20px' }}>
        {groups.length === 0 ? (
          <p>No groups available</p>
        ) : (
          groups.map((group) => (
            <Card key={group.id} fluid style={{ marginBottom: '20px' }}>
              <Card.Content>
                <a href={'#'} style={{ fontSize: '20px' }}>
                  <Card.Header><strong>{group.name}</strong>{group.type === 'private' && <Icon name='lock' style={{ padding: '10px' }} />}</Card.Header>
                </a>
              
              {/* This button is not visible if I am the owner of the group */}
              {/* <Button style={{ margin: '10px' }}
                primary
                floated="right"
                onClick={() => alert("Join me!")}
              >Join group</Button> */}
                <Card.Meta>
                  <span>{group.topic}</span>
                </Card.Meta>
                <Card.Description style={{ wordWrap: 'break-word', }}>
                  {group.description.slice(0, 300)}{group.description.length > 300 ? '...' : ''}
                </Card.Description>
              </Card.Content>
            </Card>
          ))
        )}
      </div>

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
              <label style={{ fontSize: '16px' }}>Group Name</label>
              <Input
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                required
              />
            </Form.Field>

            <Form.Field>
              <label style={{ fontSize: '16px' }}>Group Topic</label>
              <Input
                placeholder="Enter group topic"
                value={newGroupTopic}
                onChange={(e) => setNewGroupTopic(e.target.value)}
                required
              />
            </Form.Field>

            <Form.Field>
              <label style={{ fontSize: '16px' }}>Group Description</label>
              <TextArea
                placeholder="Enter group description"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                maxLength={400}
                required
              />
              <div style={{ fontSize: '12px', color: 'gray' }}>
                {newGroupDescription.length}/200 characters
              </div>
            </Form.Field>
            {errorMessage && <p style={{ color: 'red', fontSize: '16px' }}><strong>{errorMessage}</strong></p>}
            <Form.Field>
              <label style={{ fontSize: '16px' }}>Group type</label>
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
          <Button
            negative
            onClick={handleModalCancel}
          >
            Cancel
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Create Group"
            onClick={handleCreateGroup}
          />
        </Modal.Actions>
      </Modal>
    </div >
  );
};

export default GroupsPage;
