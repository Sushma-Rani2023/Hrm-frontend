import axios from "axios";
import { useState, useEffect } from "react";
import dev_url from "../../config";
import NavBar from "../NavBar";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${dev_url}/api/auth/company/getallLocation`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data.data); // make sure `data` is where the array is
      } catch (err) {
        console.error(err);
        setError("Failed to fetch locations");
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, []);

  return (
    <div className="container mt-4">
     
      <h2>Location List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Location Code</th>
              <th>Parent Location ID</th>
              <th>Is Default</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.location_id || loc.id}>
                <td>{loc.location_name}</td>
                <td>{loc.location_code}</td>
                <td>{loc.parent_location_id ?? "None"}</td>
                <td>{loc.is_default ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LocationList;
