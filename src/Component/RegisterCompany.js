import axios from "axios";
import React, { use, useState } from "react";
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
// import { useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sub_domain: "",
    email: "",
    password: "",
    address_1: "",
    country: "",
    city: "",
    payment_type: "",
    max_employees_limit: "",
    admin: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
//  const navigation = useNavigation()
const navigation = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res =await  axios.post(`${dev_url}/api/auth/company`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status==200){
      // navigation('/admin/dashboard')
      navigation('/admin/dashboard')
      console.log('navigatingg to dashbaord')
      
    }
    else{
      alert('Facing Some ISsue while creating Company')
    }
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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Company Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="sub_domain">Sub Domain</Label>
                      <Input
                        type="text"
                        name="sub_domain"
                        id="sub_domain"
                        value={formData.sub_domain}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
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
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="address_1">Address</Label>
                      <Input
                        type="text"
                        name="address_1"
                        id="address_1"
                        value={formData.address_1}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="country">Country Code </Label>
                      <Input
                        type="text"
                        name="country"
                        id="country"
                        maxLength={2}
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="payment_type">Payment Type</Label>
                      <Input
                        type="number"
                        name="payment_type"
                        id="payment_type"
                        value={formData.payment_type}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="max_employees_limit">
                        Max Employees Limit
                      </Label>
                      <Input
                        type="number"
                        name="max_employees_limit"
                        id="max_employees_limit"
                        value={formData.max_employees_limit}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="admin">Admin Name</Label>
                      <Input
                        type="text"
                        name="admin"
                        id="admin"
                        value={formData.admin}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Button type="submit" color="primary" className="w-100">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CompanyForm;
