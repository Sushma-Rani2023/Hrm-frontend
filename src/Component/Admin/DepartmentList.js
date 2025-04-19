import axios from "axios";
import { useState, useEffect } from "react";
import dev_url from "../../config";
import NavBar from "../NavBar";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        console.log("Fetching departments...");
        const token = localStorage.getItem("token");
        const response = await axios.get(`${dev_url}/api/auth/company/getallDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response data:", response.data.data);
        setDepartments(response.data.data); // Adjust this according to your actual API response
      } catch (err) {
        setError("Failed to fetch departments");
      } finally {
        setLoading(false);
      }
    };

    getDepartments();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Department List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Department Code</th>
              <th>Parent ID</th>
              <th>Is Default</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.dept_id || dept.id}>
                <td>{dept.dept_name}</td>
                <td>{dept.dept_code}</td>
                <td>{dept.parent_id ?? "None"}</td>
                <td>{dept.is_default ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentList;
