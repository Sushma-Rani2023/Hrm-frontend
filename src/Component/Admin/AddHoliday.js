import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";

const AddHoliday = ({ isOpen, toggle, onSuccess }) => {
  const [formData, setFormData] = useState({
    alias: "",
    start_date: "",
    duration_day: 1,
    work_type: 4,
    overtime_lv1: 0,
    overtime_lv2: 0,
    overtime_lv3: 0,
    company_id: "6b969e80f3ff11e9afc7acde48001122",
    department_id: "",
    location_id: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/holidays/add", formData);
      if (res.data.success) {
        onSuccess && onSuccess();
        toggle();
      }
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Holiday</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="alias">Holiday Name</Label>
            <Input
              type="text"
              name="alias"
              id="alias"
              value={formData.alias}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="start_date">Start Date</Label>
            <Input
              type="date"
              name="start_date"
              id="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="duration_day">Duration (Days)</Label>
            <Input
              type="number"
              name="duration_day"
              id="duration_day"
              value={formData.duration_day}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="work_type">Work Type</Label>
            <Input
              type="select"
              name="work_type"
              id="work_type"
              value={formData.work_type}
              onChange={handleChange}
            >
              <option value={4}>Holiday</option>
              <option value={0}>Working</option>
              <option value={1}>Half Day</option>
              {/* Add more work type options as needed */}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="department_id">Department (optional)</Label>
            <Input
              type="text"
              name="department_id"
              id="department_id"
              value={formData.department_id}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="location_id">Location (optional)</Label>
            <Input
              type="text"
              name="location_id"
              id="location_id"
              value={formData.location_id}
              onChange={handleChange}
            />
          </FormGroup>
         
          {/* You can show advanced options like overtime levels in expandable section */}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddHoliday;
