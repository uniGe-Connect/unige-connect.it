import React, { useState, useEffect, useContext } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import CreateGroupModal from './createGroupModal';
import RequireUserAccess from '../../../permissions/RequireUserAccess';
import GroupCard from '../../../common/group_card';
import { LoaderContext } from '../../../contexts/loader_context';
import { NavLink } from 'react-router-dom';

const GroupsPage = () => {
  const { setLoader } = useContext(LoaderContext);
  const [groups, setGroups] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('public_open');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateGroup = async () => {
    if (!newGroupName || !newGroupTopic || !newGroupDescription) {
      setErrorMessage('All fields are required!');
      return;
    }
    setErrorMessage('');

    const newGroup = {
      name: newGroupName,
      topic: newGroupTopic,
      description: newGroupDescription,
      type: newGroupType,
      member_count: 1
    };

    setLoader(true);
    getApiClient()
      .createGroup({
        name: newGroup.name,
        topic: newGroup.topic,
        description: newGroup.description,
        type: newGroup.type,
      })
      .then((response) => {
        if (response.data.id) {
          newGroup.created_at = response.data.created_at;
          setGroups((prevGroups) => [...prevGroups, newGroup]);
        }
      })
      .catch(makeStandardApiErrorHandler((err) => alert(err)))
      .finally(() => {
        setLoader(false);
        setIsCreateModalOpen(false);
        resetForm();
      });
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
    setLoader(true);
    getApiClient()
      .getOwnedGroups()
      .then((response) => {
        if (response && response.data && response.data.data && response.data.data.length > 0) {
          setGroups(() => [...response.data.data]);
        }
      })
      .catch(makeStandardApiErrorHandler((err) => console.log(err)))
      .finally(() => setLoader(false));
  }, [setLoader]);

  return (
    <Container>
    <GroupPage>
      {/* Button to open the Create Group Modal */}
      <IconButton primary labelPosition='left' icon='add' onClick={() => setIsCreateModalOpen(true)} floated='right' aria-label="create-group-button">
        <Icon name='add' />
        Create Group
      </IconButton>

      {/* Display groups */}
      <GroupContainer>
        {groups.length === 0 ? (
          <p>No groups available</p>
        ) : (
          groups.map((group) => (
            <CustomNavLink width='100%' key={group.id} to={'/group-overview/' + group.id}>
              <GroupCard header={group.name}
                text={group.description}
                date={group.created_at}
                type={group.type}
                member_count={group.member_count} />
            </CustomNavLink>
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
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 0px;
`;

const IconButton = styled(Button)`
  align-self: flex-end;
  background-color: var(--blue) !important;
  margin: 1.3vw !important;
  @media screen and (max-width: 583px) {
    margin: 2vh 0px !important;
  }
`;

const CustomNavLink = styled(NavLink)`
  width: 100%;
`;

export default RequireUserAccess(GroupsPage);
