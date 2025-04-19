import axios from "axios";
import { useState, useEffect } from "react";


const LateEmployee = ({data,role}) => {
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log(data,'in late employee componemt',role)
  return (
    <div className="container mt-4">

      <h2>Employee List</h2>
    
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.first_name}</td>
                <td>{employee.emp_code}</td>
                <td>{employee.punch_date}</td>
                <td>{employee.first_punch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LateEmployee;
