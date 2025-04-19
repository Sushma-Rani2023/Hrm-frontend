import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import dev_url from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeLeaveDashboard = ({ employeeId }) => {
  const [leaveData, setLeaveData] = useState({
    totalGranted: 0,
    leaveTaken: 0,
    leaveBalance: 0,
    pendingLeave: 0,
  });

  const navigation = useNavigate();

  useEffect(() => {
    const fetchLeaveData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${dev_url}/attendence/dashboard?employee_id=${user.emp_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log('dataa isss',data)

        setLeaveData({
          totalGranted: data.leave_balance || 0,
          leaveTaken: data.total_leaves_taken || 0,
          leaveBalance: data.remaining_leave || 0,
          pendingLeave: data.pending_leaves || 0,
        });
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, [employeeId]);

  const handleApplyLeave = () => {
    navigation("/Employee/leave", {
      state: { ...leaveData }, // passing full leave data to next page
    });
  };

  return (
    <Card className="shadow-lg p-4">
      <CardBody>
        <Row className="text-center">
          <Col md={3}>
            <h5>Total Granted</h5>
            <p className="fw-bold text-primary">
              {leaveData.totalGranted} Days
            </p>
          </Col>
          <Col md={3}>
            <h5>Leave Taken</h5>
            <p className="fw-bold text-danger">{leaveData.leaveTaken} Days</p>
          </Col>
          <Col md={3}>
            <h5>Leave Balance</h5>
            <p className="fw-bold text-success">
              {leaveData.leaveBalance} Days
            </p>
          </Col>
          <Col md={3}>
            <h5>Pending Leave</h5>
            <p className="fw-bold text-warning">{leaveData.pendingLeave} Days</p>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Button
            color="primary"
            disabled={leaveData.pendingLeave > 0}
            onClick={handleApplyLeave}
          >
            {leaveData.pendingLeave > 0
              ? "Pending Leave Exists"
              : "Apply for Leave"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmployeeLeaveDashboard;
