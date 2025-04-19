import React, { useState } from "react";
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
import axios from "axios";
import dev_url from "../config";

const ApplyWorkFromHome = ({ emp_id }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!startDate || !endDate || !reason) {
      return setMessage({ type: "danger", text: "All fields are required." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // ✅ Validate: Same month
    if (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
      return setMessage({ type: "danger", text: "Start and End dates must be in the same month." });
    }

    // ✅ Validate: Max 2 days
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays > 2) {
      return setMessage({ type: "danger", text: "Cannot apply for more than 2 WFH days in a month." });
    }

    try {
      const response = await axios.post(
        `${dev_url}/attendence/applywfh`,
        {
          emp_id,
          start_date: startDate,
          end_date: endDate,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage({ type: "success", text: "WFH request submitted successfully!" });
        setStartDate("");
        setEndDate("");
        setReason("");
      } else {
        setMessage({ type: "danger", text: "Failed to submit WFH request." });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Something went wrong. Try again." });
    }
  };

  console.log('work from home page is rendering')
  return (
    <Card className="shadow-lg p-4">
      <CardBody>
        <CardTitle tag="h4" className="text-center mb-4">
          Apply for Work From Home
        </CardTitle>

        {message && <Alert color={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleApply}>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
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

export default ApplyWorkFromHome;



