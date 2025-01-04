import React, { useState, useEffect, useContext } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import CreateGroupModal from './createGroupModal';
import RequireUserAccess from '../../../permissions/RequireUserAccess';
import GroupCard from '../../../common/group_card';
import { LoaderContext } from '../../../contexts/loader_context';
import { NavLink } from 'react-router-dom';
import CheckBox from '../../../common/checkBox';

const GroupsPage = () => {
  const { setLoader } = useContext(LoaderContext);
  const [ownedGroups, setOwnedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCourse, setNewGroupCourse] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState('public_open');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterOwnedGroups, setFilterOwnedGroups] = useState(false);
  const [filterJoinedGroups, setFilterJoinedGroups] = useState(false);

  const handleCreateGroup = async () => {
    if (!newGroupName || !newGroupCourse || !newGroupDescription) {
      setErrorMessage('All fields are required!');
      return;
    }
    setErrorMessage('');

    const newGroup = {
      name: newGroupName,
      course: newGroupCourse,
      description: newGroupDescription,
      type: newGroupType,
      member_count: 1,
      id: null
    };

    setLoader(true);
    getApiClient()
      .createGroup({
        name: newGroup.name,
        course_id: newGroup.course,
        description: newGroup.description,
        type: newGroup.type,
      })
      .then((response) => {
        if (response.data.id) {
          newGroup.id = response.data.id;
          newGroup.created_at = response.data.created_at;
          newGroup.is_member = response.data.is_member;
          newGroup.member_count = response.data.member_count;
          setOwnedGroups((prevGroups) => [...prevGroups, newGroup]);
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
    setNewGroupCourse('');
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
      .getMyGroups()
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.owned_groups);
          setOwnedGroups(() => [...response.data.owned_groups]);
          setJoinedGroups(() => [...response.data.joined_groups]);
          console.log(response.data);
        }
      })
      .catch(makeStandardApiErrorHandler((err) => console.log(err)))
      .finally(() => setLoader(false));
  }, [setLoader]);

  return (
    <Container>
      <GroupPage>
        <FilterContainer>
          Filter Groups:
          <CheckBox text='Owned Groups' value={filterOwnedGroups} setValue={setFilterOwnedGroups} />
          <CheckBox text='Joined Groups' value={filterJoinedGroups} setValue={setFilterJoinedGroups} />
        </FilterContainer>
        {/* Button to open the Create Group Modal */}
        <IconButton primary labelPosition='left' icon='add' onClick={() => setIsCreateModalOpen(true)} floated='right' aria-label="create-group-button">
          <Icon name='add' />
          Create Group
        </IconButton>

        {/* Display groups */}
        <GroupContainer>
          {ownedGroups.length === 0 && joinedGroups === 0 ? (
            <p>No groups available</p>
          ) : (
            (filterOwnedGroups && filterJoinedGroups) || (!filterOwnedGroups && !filterJoinedGroups)
              ? <>
                {ownedGroups.map((group) => (
                  <CustomNavLink key={group.id} to={group.deleted_at ? '/dashboard/Dashboard' : '/group-overview/' + group.id}>
                    <GroupCard header={group.name}
                      is_member={group.is_member}
                      text={group.description}
                      date={group.created_at}
                      type={group.type}
                      deleted_at={group.deleted_at}
                      member_count={group.member_count}
                      course={group.course_name} />
                  </CustomNavLink>
                ))}
                {joinedGroups.map((group) => (
                  <CustomNavLink key={group.id} to={group.deleted_at ? '/dashboard/Dashboard' : '/group-overview/' + group.id}>
                    <GroupCard header={group.name}
                      text={group.description}
                      is_member={group.is_member}
                      date={group.created_at}
                      type={group.type}
                      deleted_at={group.deleted_at}
                      member_count={group.member_count}
                      course={group.course_name} />
                  </CustomNavLink>
                ))}
                {/* eslint-disable-next-line react/jsx-closing-tag-location */}
              </> : filterJoinedGroups
                ? joinedGroups.map((group) => (
                  <CustomNavLink key={group.id} to={group.deleted_at ? '/dashboard/Dashboard' : '/group-overview/' + group.id}>
                    <GroupCard header={group.name}
                      text={group.description}
                      is_member={group.is_member}
                      deleted_at={group.deleted_at}
                      date={group.created_at}
                      type={group.type}
                      member_count={group.member_count}
                      course={group.course_name} />
                  </CustomNavLink>
                ))
                : ownedGroups.map((group) => (
                  <CustomNavLink key={group.id} to={group.deleted_at ? '/dashboard/Dashboard' : '/group-overview/' + group.id}>
                    <GroupCard header={group.name}
                      is_member={group.is_member}
                      deleted_at={group.deleted_at}
                      text={group.description}
                      date={group.created_at}
                      type={group.type}
                      member_count={group.member_count}
                      course={group.course_name} />
                  </CustomNavLink>
                ))
          )}
        </GroupContainer>

        {/* Create Group Modal */}
        <CreateGroupModal isOpen={isCreateModalOpen}
          onClose={handleModalCancel}
          newGroupName={newGroupName}
          setNewGroupName={setNewGroupName}
          newGroupCourse={newGroupCourse}
          setNewGroupCourse={setNewGroupCourse}
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
  width: 100%;
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

const FilterContainer = styled.div`
  width: 100%;
  color: #002677;
  font-family: "Fira Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export default RequireUserAccess(GroupsPage);
