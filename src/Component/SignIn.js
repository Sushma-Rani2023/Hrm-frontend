import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import dev_url from '../config';
import axios from 'axios';
import { Alert } from 'bootstrap';
import { json, Navigate } from 'react-router-dom';
function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const[err,setErr]=useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
   try{
    const response = await axios.post(`${dev_url}/api/auth/login`,formData)

    const {token,user}=response.data
  
    localStorage.setItem('token',token)
    localStorage.setItem('user',JSON.stringify(user))
    console.log('user rolee iss',user.role,user.role=='system admin','system admin')
    if (user.role === 'superAdmin') {
      window.location.href = '/admin/dashboard';
     } 
    
    else if (user.role === 'systemAdmin') {
      console.log('issss trueee')
      window.location.href = '/company/dashboard';
    }
    //  else {
    //   window.location.href = '/dashboard';
    // }

   }
   catch(err){
    console.log('errrrro',err)
    setErr(
      'Failed to login . Please try again later'
    )
   }
    
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Login</h4>
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
                 Submit
                </button>
              </form>
              <div className="text-center mt-3">
                {/* <p>
                  Not registered? <a href='/register'></a>
                </p> */}
                <a href='/register'> Not Registered ?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
