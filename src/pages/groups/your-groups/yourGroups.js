import React, { useState } from 'react';
import { Icon, Header, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import WrapperCard from './wrapperCard';
import Nav from '../../../common/nav';
import Heading from '../../../common/heading';
import CreateGroupModal from './createGroupModal'; // Import the new modal component

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
  const [newGroupType, setNewGroupType] = useState('public_open');
  const [errorMessage, setErrorMessage] = useState('');

  // Send POST request to backend
  const createGroup = async (group) => {
    return getApiClient()
      .CreateGroup({
        name: group.name,
        topic: group.topic,
        description: group.description,
        type: group.type,
        owner_id: group.owner_id
      })
      .then((response) => {
        if (response.data.id) {
          group.id = response.data.id;
        }
        return group;
      })
      .catch(makeStandardApiErrorHandler((err) => console.log(err)));
  };

  const handleCreateGroup = async () => {
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
      owner_id: 1, // Assuming the logged-in user has ID 1
    };
    const updatedGroup = await createGroup(newGroup);

    if (updatedGroup.id < 0) {
      alert('Error while creating group');
    } else {
      setGroups([...groups, updatedGroup]);
    }

    // Close the modal and reset the form
    setIsCreateModalOpen(false);
    resetForm();
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
  };

  return (
    <GroupPage>
      <Heading />
      <Nav />
      <Title>Your groups</Title>

      {/* Button to open the Create Group Modal */}
      <IconButton primary icon='add' onClick={() => setIsCreateModalOpen(true)} floated='right'>
        <Icon name='add' />
        Create Group
      </IconButton>

      {/* Display groups */}
      <GroupContainer>
        {groups.length === 0 ? (
          <p>No groups available</p>
        ) : (
          groups.map((group) => (
            <WrapperCard group={group} key={group.id} />
          ))
        )}
      </GroupContainer>

      {/* Create Group Modal */}
      <CreateGroupModal isOpen={isCreateModalOpen}
        onClose={handleModalCancel}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        newGroupTopic={newGroupTopic}
        setNewGroupTopic={setNewGroupTopic}
        newGroupDescription={newGroupDescription}
        setNewGroupDescription={setNewGroupDescription}
        newGroupType={newGroupType}
        setNewGroupType={setNewGroupType}
        errorMessage={errorMessage}
        onCreate={handleCreateGroup} />
    </GroupPage>
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
  font-family: 'Roboto Slab';
  margin-top: 40px;
`;

const IconButton = styled(Button).attrs(props => ({
  positive: props.positive,
  icon: props.icon,
  labelPosition: 'left',
  content: props.content,
}))`
  margin: 20px !important;
  background-color: var(--blue) !important;
`;

export default GroupsPage;
