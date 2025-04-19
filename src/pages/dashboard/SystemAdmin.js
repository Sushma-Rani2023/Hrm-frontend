// import axios from "axios";
// import { useState, useEffect } from "react";
// import dev_url from "../../config";
// import NavBar from "../../Component/NavBar";

// const System = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getEmployees = async () => {
//       try {
//         console.log("Fetching employees...");
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${dev_url}/api/employee/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,

//           },
//         });
//         console.log("Response data:", response.data);
//         setEmployees(response.data.employees);
//       } catch (err) {
//         setError("Failed to fetch employees");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getEmployees();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <NavBar buttonLabel="Employee" page='/company/Employee' attendance='/company/attendence' />

//       <h2>Employee List</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">{error}</p>}
//       {!loading && !error && (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Code</th>
//               <th>Phone</th>
//               <th>Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.employee_id}>
//                 <td>{employee.first_name}</td>
//                 <td>{employee.emp_code}</td>
//                 <td>{employee.phone}</td>
//                 <td>{employee.address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default System;


import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import axios from "axios";
import dev_url from "../../config";
import ListEmployee from "../../Component/Admin/ListEmployee";
import EmployeeLeaveDashboard from "../../Component/LeaveDashboard";
import HolidaysList from "../../Component/Holiday";
import NavBar from "../../Component/NavBar";
import DepartmentList from "../../Component/Admin/DepartmentList";
import PositionList from "../../Component/Admin/PositionList";
import LocationList from "../../Component/Admin/LocationList";
const System = () => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [activeTab, setActiveTab] = useState("ListEmployee");
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
      case "ListEmployee":
        return <ListEmployee data ={user}/>;

      // case "lateEmployees":
      //   return <LateEmployee data={data} role="employee" />;
      // case "earlyCheckout":
      //   return <EarlyCheckout data={data} role="employee" />;
      // case "absentEmployees":
      //   return <AbsentEmployee data={data} role="employee" />;

      //   case "workFromHome":
      //   return <ApplyWorkFromHome emp_id={user.emp_id} role="employee" />;
       case "Department":
        return <DepartmentList/>
        
        case "Position":
          return <PositionList/>

        case "Location":
          return <LocationList/>

        case "Holiday":
          return <HolidaysList role="employee"/>
      default:
        return null;
    }
  };


  return (
    <Container className="mt-4">
  <NavBar buttonLabel="Employee" page='/company/Employee' attendance='/company/attendence' />

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
           "ListEmployee",
            "Holiday",
            "Department",
            "Position",
            "Location",
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
              {tab === "ListEmployee"
                ? "ListEmployee" 
                : tab==="Department"
                ? "Department"
                : tab==="Position"
                ? "Positon"
                :tab==="Location"
                ? "Location"
                
                : "Holiday"}
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

export default System;

