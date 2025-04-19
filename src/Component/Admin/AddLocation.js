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

const AddLocationModal = ({ isOpen, toggle, onSave }) => {
  const [locationName, setLocationName] = useState('');
  const [locationCode, setLocationCode] = useState('');
  const [parentLocationId, setParentLocationId] = useState('');
  const [isDefault, setIsDefault] = useState('0');

  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (locationName.trim() === '') {
      alert('Location name is required');
      return;
    }

    const locationData = {
      location_name: locationName,
      location_code: locationCode,
      parent_location_id: parentLocationId.trim() !== '' ? Number(parentLocationId) : null,
      is_default: Number(isDefault),
    };

    try {
      const result = await axios.post(`${dev_url}/api/auth/company/createLocation`, locationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        console.log('Location created successfully');
        if (onSave) onSave();
      }
    } catch (error) {
      console.error('Error creating location:', error);
      alert('Failed to create location');
    }

    clearForm();
    toggle();
  };

  const handleCancel = () => {
    clearForm();
    toggle();
  };

  const clearForm = () => {
    setLocationName('');
    setLocationCode('');
    setParentLocationId('');
    setIsDefault('0');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Location</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="locationName">Location Name</Label>
            <Input
              type="text"
              id="locationName"
              placeholder="Enter location name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="locationCode">Location Code</Label>
            <Input
              type="text"
              id="locationCode"
              placeholder="Enter location code (optional)"
              value={locationCode}
              onChange={(e) => setLocationCode(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="parentLocationId">Parent Location ID</Label>
            <Input
              type="number"
              id="parentLocationId"
              placeholder="Enter parent location ID (optional)"
              value={parentLocationId}
              onChange={(e) => setParentLocationId(e.target.value)}
              min="0"
            />
            <FormText>Leave blank if this is a top-level location.</FormText>
          </FormGroup>

          <FormGroup tag="fieldset">
            <Label>Is Default Location?</Label>
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

export default AddLocationModal;
