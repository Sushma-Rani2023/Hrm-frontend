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
  Alert
} from "reactstrap";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sub_domain: "",
    address_1: "",
    country: "",
    city: "",
    payment_type: "",
    subscription_start_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    subscription_end_date: "",
    max_employees_limit: ""
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting", formData);
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <CardHeader className="bg-primary text-white text-center">
              <h4>Company Registration</h4>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}><FormGroup><Label for="name">Company Name</Label><Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required /></FormGroup></Col>
                  <Col md={6}><FormGroup><Label for="sub_domain">Sub Domain</Label><Input type="text" name="sub_domain" id="sub_domain" value={formData.sub_domain} onChange={handleChange} required /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md={6}><FormGroup><Label for="address_1">Address</Label><Input type="text" name="address_1" id="address_1" value={formData.address_1} onChange={handleChange} required /></FormGroup></Col>
                  <Col md={6}><FormGroup><Label for="country">Country</Label><Input type="text" name="country" id="country" value={formData.country} onChange={handleChange} required /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md={6}><FormGroup><Label for="city">City</Label><Input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required /></FormGroup></Col>
                  <Col md={6}><FormGroup><Label for="payment_type">Payment Type</Label><Input type="number" name="payment_type" id="payment_type" value={formData.payment_type} onChange={handleChange} required /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md={6}><FormGroup><Label for="subscription_start_date">Subscription Start Date</Label><Input type="datetime-local" name="subscription_start_date" id="subscription_start_date" value={formData.subscription_start_date} onChange={handleChange} required /></FormGroup></Col>
                  <Col md={6}><FormGroup><Label for="subscription_end_date">Subscription End Date</Label><Input type="datetime-local" name="subscription_end_date" id="subscription_end_date" value={formData.subscription_end_date} onChange={handleChange} required /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md={6}><FormGroup><Label for="max_employees_limit">Max Employees Limit</Label><Input type="number" name="max_employees_limit" id="max_employees_limit" value={formData.max_employees_limit} onChange={handleChange} required /></FormGroup></Col>
                </Row>
                <Button type="submit" color="primary" className="w-100">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CompanyForm;
