import axios from "axios";
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Container,
  Card,
  CardBody,
  CardHeader,
  Alert,
} from "reactstrap";
import dev_url from "../config";
import { useNavigate } from "react-router-dom";
const EmployeeForm = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    emp_code: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    hire_date: "",
    department_id: "",
    position_id: "",
    company_id: "",
    is_active: true,
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //enable_att,enable_payroll,enable_overtime,enable_holiday,enable_whatsapp,whatsapp_exception,whatsapp_punch,deleted,enable_sms,sms_exception,sms_punch
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${dev_url}/api/employee/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.status === 200) {
        console.log("Created Successfully");
        navigation("/company/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 501) {
        console.log("Limit reached");
        setError("Maximum employees limit reached");
      } else {
        setError("Error while adding employee");
        console.error("Error:", error);
      }
    }
  };
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <CardHeader className="bg-primary text-white text-center">
              <h4>Employee Registration</h4>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="emp_code">Employee Code</Label>
                      <Input
                        type="text"
                        name="emp_code"
                        id="emp_code"
                        value={formData.emp_code}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="first_name">First Name</Label>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="last_name">Last Name</Label>
                      <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="mobile">Mobile</Label>
                      <Input
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="hire_date">Hire Date</Label>
                      <Input
                        type="date"
                        name="hire_date"
                        id="hire_date"
                        value={formData.hire_date}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="department_id">Department</Label>
                      <Input
                        type="text"
                        name="department_id"
                        id="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="position_id">Position</Label>
                      <Input
                        type="text"
                        name="position_id"
                        id="position_id"
                        value={formData.position_id}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="is_active"
                          checked={formData.is_active}
                          onChange={handleChange}
                        />{" "}
                        Active
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Button type="submit" color="primary" className="w-100">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeForm;
