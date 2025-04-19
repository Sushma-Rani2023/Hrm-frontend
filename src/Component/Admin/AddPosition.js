import axios from 'axios';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import dev_url from '../../config';

const AddPositionModal = ({ isOpen, toggle, onSave }) => {
  const [positionName, setPositionName] = useState('');
  const [positionCode, setPositionCode] = useState('');
  const [parentPositionId, setParentPositionId] = useState('');
  const [isDefault, setIsDefault] = useState('0'); // '1' = Yes, '0' = No

  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (positionName.trim() === '') {
      alert('Position name is required');
      return;
    }

    const positionData = {
      position_name: positionName,
      position_code: positionCode,
      parent_position_id: parentPositionId.trim() !== '' ? Number(parentPositionId) : null,
      is_default: Number(isDefault),
    };

    try {
      const result = await axios.post(`${dev_url}/api/auth/company/createPosition`, positionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        console.log('Position created successfully');
        if (onSave) onSave(); // notify parent if needed
      }
    } catch (error) {
      console.error('Error creating position:', error);
      alert('Failed to create position');
    }

    clearForm();
    toggle();
  };

  const handleCancel = () => {
    clearForm();
    toggle();
  };

  const clearForm = () => {
    setPositionName('');
    setPositionCode('');
    setParentPositionId('');
    setIsDefault('0');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Position</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="positionName">Position Name</Label>
            <Input
              type="text"
              id="positionName"
              placeholder="Enter position name"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="positionCode">Position Code</Label>
            <Input
              type="text"
              id="positionCode"
              placeholder="Enter position code (optional)"
              value={positionCode}
              onChange={(e) => setPositionCode(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="parentPositionId">Parent Position ID</Label>
            <Input
              type="number"
              id="parentPositionId"
              placeholder="Enter parent position ID (optional)"
              value={parentPositionId}
              onChange={(e) => setParentPositionId(e.target.value)}
              min="0"
            />
            <FormText>Leave blank if this is a top-level position.</FormText>
          </FormGroup>

          <FormGroup tag="fieldset">
            <Label>Is Default Position?</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="isDefault"
                  value="1"
                  checked={isDefault === '1'}
                  onChange={() => setIsDefault('1')}
                />{' '}
                Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="isDefault"
                  value="0"
                  checked={isDefault === '0'}
                  onChange={() => setIsDefault('0')}
                />{' '}
                No
              </Label>
            </FormGroup>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPositionModal;
