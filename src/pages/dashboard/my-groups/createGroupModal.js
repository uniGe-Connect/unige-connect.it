import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, TextArea, Checkbox, Dropdown } from 'semantic-ui-react';
import { getApiClient, makeStandardApiErrorHandler } from '../../../server/get_api_client';
import styled from 'styled-components';

const CreateGroupModal = ({
  isOpen,
  onClose,
  newGroupName,
  setNewGroupName,
  newGroupCourse,
  setNewGroupCourse,
  newGroupDescription,
  setNewGroupDescription,
  newGroupType,
  setNewGroupType,
  errorMessage,
  onCreate
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
   useEffect(() => {
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
   , []);

  return (
    <Modal open={isOpen}
      onClose={onClose}
      size='small'>
      <Modal.Header>Create New Group</Modal.Header>
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
            <FormLabel>Group Course</FormLabel>
            <Dropdown placeholder='Enter group course'
              search
              selection
              loading={loading}
              onChange={(e, data) => setNewGroupCourse(data.value)}
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
        <DangerButton negative
          onClick={onClose}
          aria-label='cancel-group-button-modal'>
          Cancel
        </DangerButton>
        <MainButton positive
          floated='right'
          primary
          onClick={onCreate}
          aria-label='create-group-button-modal'>
          Create Group
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

export default CreateGroupModal;
