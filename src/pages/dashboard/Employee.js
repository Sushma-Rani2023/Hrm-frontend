import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import axios from "axios";
import dev_url from "../../config";
import LateEmployee from "../../Component/LateEmployee";
import AbsentEmployee from "../../Component/AbsentEmployee";
import EarlyCheckout from "../../Component/EarlyCheckout";
import EmployeeLeaveDashboard from "../../Component/LeaveDashboard";
import HolidaysList from "../../Component/Holiday";
import ApplyWorkFromHome from "../../Component/WorkFromHome";

const EmployerAttendenceDashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); 
  console.log('emp_id',user.emp_id,user)

  const fetchData = async (tab) => {
    
    const url = `${dev_url}/attendence/${tab}?startDate=${startDate}&endDate=${endDate}&emp_code=${user.emp_id}`;
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, startDate, endDate]);

  const renderComponent = () => {
    console.log("active tab usss", activeTab);
    switch (activeTab) {
      case "Dashboard":
        return <EmployeeLeaveDashboard data ={user}/>;
      case "lateEmployees":
        return <LateEmployee data={data} role="employee" />;
      case "earlyCheckout":
        return <EarlyCheckout data={data} role="employee" />;
      case "absentEmployees":
        return <AbsentEmployee data={data} role="employee" />;

        case "workFromHome":
        return <ApplyWorkFromHome emp_id={user.emp_id} role="employee" />;


        case "Holiday":
          return <HolidaysList role="employee"/>
      default:
        return null;
    }
  };


  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date (Optional)"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {[
            "Dashboard",
            "lateEmployees",
            "earlyCheckout",
            "absentEmployees",
            "workFromHome",
            "Holiday"
          ].map((tab) => (
            <Button
              key={tab}
              style={{
                backgroundColor: activeTab === tab ? "#007bff" : "#ccc",
                color: "white",
                marginRight: "10px",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Dashboard"
                ? "Dashboard"
                : tab === "lateEmployees"
                ? "Late Employees"
                : tab === "earlyCheckout"
                ? "Early Checkout"
                : tab==="Holiday"
                ? "Holiday"
                :tab==="workFromHome"
                ? "WorkFromHome"

                : "Absentees"}
            </Button>
          ))}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>{renderComponent()}</Col>
      </Row>
    </Container>
  );
};

export default EmployerAttendenceDashboard;
