import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Input, Label } from "reactstrap";
import axios from "axios";
import dev_url from "../../config";
import LateEmployee from "../../Component/LateEmployee";
import AbsentEmployee from "../../Component/AbsentEmployee";
import EarlyCheckout from "../../Component/EarlyCheckout";

const EmployerAttendenceDashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [activeTab, setActiveTab] = useState("lateEmployees");
  const [data, setData] = useState([]);

  // Filters
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const fetchData = async (tab) => {
    const token = localStorage.getItem("token");
    let url = `${dev_url}/attendence/${tab}?startDate=${startDate}&endDate=${endDate}`;
    
    if (selectedDepartment) {
      url += `&department_id=${selectedDepartment}`;
    }
    if (selectedPosition) {
      url += `&position_id=${selectedPosition}`;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const fetchFilters = async () => {
    const token = localStorage.getItem("token");
    try {
      const [deptRes, posRes] = await Promise.all([
        axios.get(`${dev_url}/api/auth/company/getallDepartment`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${dev_url}/api/auth/company/getAllPosition`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setDepartments(deptRes.data.data || []);
      setPositions(posRes.data.data || []);
    } catch (err) {
      console.error("Error fetching filters", err);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, startDate, endDate, selectedDepartment, selectedPosition]);

  const renderComponent = () => {
    switch (activeTab) {
      case "lateEmployees":
        return <LateEmployee data={data} role="admin" />;
      case "earlyCheckout":
        return <EarlyCheckout data={data} role="admin" />;
      case "absentEmployees":
        return <AbsentEmployee data={data} role="admin" />;
      default:
        return null;
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={3}>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Label>End Date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Label>Department</Label>
          <Input
            type="select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All</option>
            {departments.map((dept) => (
              <option key={dept.dept_id} value={dept.dept_id}>
                {dept.dept_name}
              </option>
            ))}
          </Input>
        </Col>
        <Col md={3}>
          <Label>Position</Label>
          <Input
            type="select"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="">All</option>
            {positions.map((pos) => (
              <option key={pos.position_id} value={pos.position_id}>
                {pos.position_name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {["lateEmployees", "earlyCheckout", "absentEmployees"].map((tab) => (
            <Button
              key={tab}
              style={{
                backgroundColor: activeTab === tab ? "#007bff" : "#ccc",
                color: "white",
                marginRight: "10px",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "lateEmployees"
                ? "Late Employees"
                : tab === "earlyCheckout"
                ? "Early Checkout"
                : "Absentees"}
            </Button>
          ))}
        </Col>
      </Row>

      <Row>
        <Col>{renderComponent()}</Col>
      </Row>
    </Container>
  );
};

export default EmployerAttendenceDashboard;
