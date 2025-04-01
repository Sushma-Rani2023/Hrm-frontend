import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'bootstrap';
import axios from 'axios';



function RegisterUser() {
  console.log('ffffffffff',process.env.REACT_APP_API_URL)
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
    e.preventDefault()


    if (!formData.email || !formData.password){
        Alert.Alert('Please fill all the Required Fields')
    }
    else{


        Alert.alert('Processing the dataaa')
        const res = await axios.post('http://localhost:8000/')

    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Not registered? <a href="/login">Register Here </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
