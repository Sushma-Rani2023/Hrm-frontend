// import React, { useState } from "react";
// import {
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   Alert,
//   Container,
//   Card,
//   CardBody,
//   CardHeader,
// } from "reactstrap";
// import dev_url from "../../config";
// import axios from "axios";
// import NavBar from "../../Component/NavBar";

// function Dashboard() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     email: "",
//     name: "",
//     password: "",
//     address: "",
//     phone: "",
//     industry: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         `${dev_url}/api/auth/company/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Correct way to pass token
//           },
//         }
//       );

//       console.log("User registered", response.data);
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Failed to register. Please try again later.");
//       setSuccess("");
//     }
//   };

//   return (
//     <>
//       <NavBar  buttonLabel={`Company`}/> {/* ✅ Include Navbar component here */}
//       <Container className="mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <Card>
//               <CardHeader className="bg-primary text-white text-center">
//                 <h4>Register</h4>
//               </CardHeader>
//               <CardBody>
//                 {error && <Alert color="danger">{error}</Alert>}
//                 {success && <Alert color="success">{success}</Alert>}
//                 <Form onSubmit={handleSubmit}>
//                   <FormGroup>
//                     <Label for="companyName">Company Name</Label>
//                     <Input
//                       type="text"
//                       name="companyName"
//                       id="companyName"
//                       value={formData.companyName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="email">Email</Label>
//                     <Input
//                       type="email"
//                       name="email"
//                       id="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                     <div className="mb-3">
//                       <label className="form-label">Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         className="form-control"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="password">Password</Label>
//                     <Input
//                       type="password"
//                       name="password"
//                       id="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="companyAddress">Address</Label>
//                     <Input
//                       type="text"
//                       name="address"
//                       id="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                     />
//                     <FormGroup>
//                       <Label for="number">Mobile No</Label>
//                       <Input
//                         type="number"
//                         name="phone"
//                         id="number"
//                         value={formData.phone}
//                         minLength={10}
//                         maxLength={10}
//                         onChange={handleChange}
//                         required
//                       />
//                     </FormGroup>
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="industry">Industry</Label>
//                     <Input
//                       type="select"
//                       name="industry"
//                       id="industry"
//                       value={formData.industry}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Industry</option>
//                       <option value="tech">Technology</option>
//                       <option value="manufacturing">Manufacturing</option>
//                       <option value="healthcare">Healthcare</option>
//                       <option value="retail">Retail</option>
//                     </Input>
//                   </FormGroup>
//                   <Button type="submit" color="primary" className="w-100">
//                     Add
//                   </Button>
//                 </Form>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default Dashboard;

import axios from "axios";
import { useState, useEffect } from "react";
import dev_url from "../../config";
// import { NavBar } from "../../Component/NavBar";
import NavBar from "../../Component/NavBar";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("system admin page is thiss");
    const getCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${dev_url}/api/auth/company/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("respons sis", response.data);
        setCompanies(response.data);
      } catch (err) {
        setError("Failed to fetch companies");
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  return (
    <div className="container mt-4">
      {/* <NavBar buttonLabel='Company' />  */}
      <NavBar buttonLabel="Company" page="/admin/addCompany" />

      <h2>Company List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
