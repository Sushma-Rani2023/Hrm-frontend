import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import dev_url from "../config";

const WorkFromHomeApplication = ({ employee_id }) => {
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!start_date || !end_date || !reason) {
      setMessage({ type: "danger", text: "All fields are required!" });
      return;
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    if (start > end) {
      setMessage({ type: "danger", text: "Start date cannot be after end date." });
      return;
    }

    const dayDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (dayDiff > 2) {
      setMessage({
        type: "danger",
        text: "You cannot apply for more than 2 work-from-home days in a month.",
      });
      return;
    }

    const requestData = {
      emp_id: employee_id,
      start_date,
      end_date,
      reason,
    };

    try {
      const response = await axios.post(`${dev_url}/attendence/applywfh`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setMessage({ type: "success", text: "WFH request submitted successfully!" });
        setStartDate("");
        setEndDate("");
        setReason("");
      } else {
        setMessage({
          type: "danger",
          text: response.data?.error || "Failed to apply for WFH.",
        });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "An error occurred while submitting WFH request.",
      });
    }
  };

  return (
    <Card className="shadow-lg p-4">
      <CardBody>
        <CardTitle tag="h4" className="text-center mb-4">
          Apply for Work From Home
        </CardTitle>

        {message && <Alert color={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="start_date">Start Date</Label>
            <Input
              type="date"
              id="start_date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="end_date">End Date</Label>
            <Input
              type="date"
              id="end_date"
              value={end_date}
              min={start_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="reason">Reason</Label>
            <Input
              type="textarea"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormGroup>

          <div className="text-center">
            <Button color="primary" type="submit">
              Submit WFH Request
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default WorkFromHomeApplication;
