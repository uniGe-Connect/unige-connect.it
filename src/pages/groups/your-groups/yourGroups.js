import React, { useState, useEffect } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import WrapperCard from './wrapperCard';
import CreateGroupModal from './createGroupModal'; // Import the new modal component

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('public_open');
  const [errorMessage, setErrorMessage] = useState('');

  const createGroup = async (group) => {
    return getApiClient()
      .createGroup({
        name: group.name,
        topic: group.topic,
        description: group.description,
        type: group.type,
      })
      .then((response) => {
        if (response.data.id) {
          group.id = response.data.id;
        }
        return group;
      })
      .catch(makeStandardApiErrorHandler((err) => console.log(err)));
  };

  const getOwnedGroups = () => {
    return getApiClient()
      .getOwnedGroups()
      .then((response) => {
        if (response) {
          setGroups((prevGroups) => [...prevGroups, ...response.data.data]); // Using the updater form of setState
        }
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
    };
    const updatedGroup = await createGroup(newGroup);

    if (updatedGroup.id < 0) {
      alert('Error while creating group');
    } else {
      setGroups((prevGroups) => [...prevGroups, updatedGroup]); // Using the updater form of setState
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

  useEffect(() => {
    getOwnedGroups();
  }, []);

  return (
    <Container>
    <GroupPage>
      {/* Button to open the Create Group Modal */}
      <IconButton primary icon='add' onClick={() => setIsCreateModalOpen(true)} floated='right' aria-label="create-group-button">
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
    </Container>
  );
};

const Container = styled.div`
  min-height: 90vh;
  padding: 0px 15vw;
`;

const GroupPage = styled.div`
`;

const GroupContainer = styled.div`
  padding: 0px;
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
