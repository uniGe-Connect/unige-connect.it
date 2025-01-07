import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, TextArea, Checkbox, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { getApiClient, makeStandardApiErrorHandler } from '../../server/get_api_client';

const UpdateGroupModal = ({
  isOpen,
  onClose,
  groupId,
  newGroupName,
  setNewGroupName,
  newGroupCourse,
  setNewGroupTopic,
  newGroupDescription = '',
  setNewGroupDescription,
  newGroupType,
  setNewGroupType,
  errorMessage,
  onCreate,
}) => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
  useEffect(() => {
    if (groupId) {
      getApiClient().getGroupInfo(groupId).then(response => {
        const group = response.data;
        setNewGroupName(group.name);
        setNewGroupTopic(group.topic);
        setNewGroupDescription(group.description);
        setNewGroupType(group.type);
      }).catch(error => {
        console.error('Error fetching group data:', error);
      });

      setLoading(true);
      getApiClient().getCourses().then((response) => {
        const result = [];
        response.data.data.forEach((element) => result.push(
          { key: element.id, value: element.id, text: element.name }
        ));
        setOptions(result);
      }).catch(makeStandardApiErrorHandler((err) => alert(err)))
      .finally(() => setLoading(false));
     }
    }
    , [groupId, setNewGroupName, setNewGroupTopic, setNewGroupDescription, setNewGroupType]);
  return (
    <Modal open={isOpen} onClose={onClose} size='small'>
      <Modal.Header>Update Group</Modal.Header>
      <Modal.Content>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Field>
            <FormLabel>Group Name</FormLabel>
            <Input placeholder='Enter group name'
                   value={newGroupName}
                   onChange={(e) => setNewGroupName(e.target.value)}
                   required />
          </Form.Field>

          <Form.Field>
            <Dropdown id='course-dropdown'
                placeholder='Enter group course'
                search
                selection
                loading={loading}
                onChange={(e, data) => newGroupCourse(data.value)}
                options={options}
                required />
          </Form.Field>

          <Form.Field>
            <FormLabel>Group Description</FormLabel>
            <TextArea placeholder='Enter group description'
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      maxLength={300}
                      required />
            <div style={{ fontSize: '12px', color: 'gray' }}>
              {newGroupDescription.length}/300 characters
            </div>
          </Form.Field>

          {errorMessage && <p style={{ color: 'red', fontSize: '16px' }}><strong>{errorMessage}</strong></p>}

          <Form.Field>
            <FormLabel>Group Type</FormLabel>
          </Form.Field>

          <Form.Field>
            <Checkbox radio
                      label='Public Open'
                      name='checkboxRadioGroup'
                      value='public_open'
                      checked={newGroupType === 'public_open'}
                      onChange={(e, data) => setNewGroupType(data.value)} />
          </Form.Field>
          <Form.Field>
            <Checkbox radio
                      label='Public Closed'
                      name='checkboxRadioGroup'
                      value='public_closed'
                      checked={newGroupType === 'public_closed'}
                      onChange={(e, data) => setNewGroupType(data.value)} />
          </Form.Field>
          <Form.Field>
            <Checkbox radio
                      label='Private'
                      name='checkboxRadioGroup'
                      value='private'
                      checked={newGroupType === 'private'}
                      onChange={(e, data) => setNewGroupType(data.value)} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DangerButton negative onClick={onClose} aria-label='cancel-group-button-modal'>
          Cancel
        </DangerButton>
        <MainButton positive floated='right' primary onClick={onCreate} aria-label='update-group-button-modal'>
          Update Group
        </MainButton>
      </Modal.Actions>
    </Modal>
  );
};

const MainButton = styled(Button)`
  margin: 20px !important;
  background-color: var(--blue) !important;
`;

const DangerButton = styled(Button)`
  margin: 20px !important;
  background-color: var(--red) !important;
`;

const FormLabel = styled.label`
  font-size: 16px !important;
`;

export default UpdateGroupModal;
