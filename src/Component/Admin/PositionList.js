import axios from "axios";
import { useState, useEffect } from "react";
import dev_url from "../../config";
import NavBar from "../NavBar";

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPositions = async () => {
      try {
        console.log("Fetching positions...");
        const token = localStorage.getItem("token");
        const response = await axios.get(`${dev_url}/api/auth/company/getallPosition`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response data:", response.data.data);
        setPositions(response.data.data);
      } catch (err) {
        setError("Failed to fetch positions");
      } finally {
        setLoading(false);
      }
    };

    getPositions();
  }, []);

  return (
    <div className="container mt-4">
     
      <h2>Position List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Position Name</th>
              <th>Position Code</th>
              <th>Parent Position ID</th>
              <th>Is Default</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => (
              <tr key={pos.position_id || pos.id}>
                <td>{pos.position_name}</td>
                <td>{pos.position_code}</td>
                <td>{pos.parent_position_id ?? "None"}</td>
                <td>{pos.is_default ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PositionList;
