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
const AddDepartmentModal = ({ isOpen, toggle, onSave }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [dept_code, setdept_code] = useState('');
  const [parentId, setParentId] = useState('');
  const [isDefault, setIsDefault] = useState('0'); // '1' = Yes, '0' = No
  //const token = JSON.stringify(localStorage.getItem('token'))
  const token = localStorage.getItem('token')
  const handleSubmit = async() => {
    if (departmentName.trim() === '') {
      alert('Department name is required');
      return;
    }

    const departmentData = {
      dept_name: departmentName,
      dept_code,
      parent_id: parentId.trim() !== '' ? Number(parentId) : null,
      is_default: Number(isDefault),
      

    };

   const result = await axios.post(`${dev_url}/api/auth/company/createDepartment`,
    departmentData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
   )
   if (result.status===200){
    console.log('response is 200') 
    

   }
    clearForm();
    toggle();
  };

  const handleCancel = () => {
    clearForm();
    toggle();
  };

  const clearForm = () => {
    setDepartmentName('');
    setdept_code('');
    setParentId('');
    setIsDefault('0');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Department</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="departmentName">Department Name</Label>
            <Input
              type="text"
              id="departmentName"
              placeholder="Enter department name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="dept_code">dept_code</Label>
            <Input
              type="text"
              id="dept_code"
              placeholder="Enter department dept_code (optional)"
              value={dept_code}
              onChange={(e) => setdept_code(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="parentId">Parent Department ID</Label>
            <Input
              type="number"
              id="parentId"
              placeholder="Enter parent department ID (optional)"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              min="0"
            />
            <FormText>Leave blank if this is a top-level department.</FormText>
          </FormGroup>

          <FormGroup tag="fieldset">
            <Label>Is Default Department?</Label>
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

export default AddDepartmentModal;
