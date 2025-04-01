import axios from "axios";
import { useState, useEffect } from "react";
import dev_url from "../../config";
import NavBar from "../../Component/NavBar";

const System = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        console.log("Fetching employees...");
        const token = localStorage.getItem("token");
        const response = await axios.get(`${dev_url}/api/employee/`, {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        });
        console.log("Response data:", response.data);
        setEmployees(response.data.employees);
      } catch (err) {
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <NavBar buttonLabel="Employee" page='/company/Employee' attendance='/company/attendence' />

      <h2>Employee List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.first_name}</td>
                <td>{employee.emp_code}</td>
                <td>{employee.phone}</td>
                <td>{employee.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default System;
