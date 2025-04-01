import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";
import axios from "axios";
import dev_url from "../../config";

const EmployerAttendenceDashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [activeTab, setActiveTab] = useState("lateEmployees");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = `${dev_url}/attendence/${activeTab}?startDate=${startDate}&endDate=${endDate}`;
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, activeTab]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Col>
        <Col md={4}>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date (Optional)" />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            style={{ backgroundColor: activeTab === "lateEmployees" ? "#ffcc00" : "#ccc", color: "black" }}
            onClick={() => setActiveTab("lateEmployees")}
          >
            Late Employees
          </Button>
          <Button
            style={{ backgroundColor: activeTab === "earlyCheckout" ? "#28a745" : "#ccc", color: "black" }}
            onClick={() => setActiveTab("earlyCheckout")}
          >
            Early Checkout
          </Button>
          <Button
            style={{ backgroundColor: activeTab === "absentEmployees" ? "#dc3545" : "#ccc", color: "black" }}
            onClick={() => setActiveTab("absentEmployees")}
          >
            Absentees
          </Button>
        </Col>
      </Row>
      <Table bordered className="mt-3">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Arrival Time </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.emp_code || row.id}</td>
              <td>{row.first_name || "Unknown"}</td>
              <td>{row.first_punch}</td>
              <td>{row.first_punch}</td>
            
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployerAttendenceDashboard;