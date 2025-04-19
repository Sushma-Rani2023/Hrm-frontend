
import { useState, useEffect } from "react";

const AbsentEmployee = ({data,role}) => {
   console.log(role,'role is')

  return (
    <div className="container mt-4">

      <h2>Employee List</h2>
      { (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.first_name}</td>
                <td>{employee.emp_code}</td>
                <td>{employee.punch_date}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AbsentEmployee;
