import React, { useState } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import axios from 'axios';

const AddTimeInterval = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    alias: '',
    use_mode: '',
    in_time: '',
    in_ahead_margin: '',
    in_above_margin: '',
    out_ahead_margin: '',
    out_above_margin: '',
    duration: '',
    in_required: '',
    out_required: '',
    allow_late: '',
    allow_leave_early: '',
    work_day: '',
    early_in: '',
    min_early_in: '',
    late_out: '',
    min_late_out: '',
    overtime_lv: '',
    overtime_lv1: '',
    overtime_lv2: '',
    overtime_lv3: '',
    multiple_punch: '',
    available_interval_type: '',
    available_interval: '',
    work_time_duration: '',
    func_key: '',
    work_type: '',
    day_change: '',
    first_half_out_time: '',
    second_half_in_time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/timeinterval/add', formData);
      alert("Time interval added successfully");
      toggle();
    } catch (err) {
      console.error(err);
      alert("Error adding time interval");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Add Time Interval</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {Object.entries(formData).map(([key, value]) => (
              <Col md={6} className="mb-3" key={key}>
                <FormGroup>
                  <Label for={key}>{key.replace(/_/g, ' ')}</Label>
                  <Input
                    type={key.includes("time") ? "time" : "text"}
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTimeInterval;
