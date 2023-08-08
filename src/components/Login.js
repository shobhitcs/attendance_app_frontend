import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/formStyle.css';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const response = await axiosInstance.post('Auth/login', formData); // Replace 'Auth/login' with your desired login endpoint
      console.log('Login response:', response.data['token']['access']);
      localStorage.setItem('access_token',response.data['token']['access']);
      localStorage.setItem('refresh_token', response.data['token']['refresh']);
      axiosInstance.defaults.headers['Authorization'] = 'Bearer '+ localStorage.getItem('access_token');
      console.log('Bearer '+ localStorage.getItem('access_token'));
      const response1 = await axiosInstance.get('Auth/profile')
      console.log(response1.data)
      // Do any further processing based on the response if needed

      setFormData({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const buttonStyle = {
    // Add your button style if needed
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="form-box">
        <h1 className="form-head">SIGN IN</h1>

        <TextField
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <NavLink style={{ width: '100%', textDecoration: 'none' }} to="/">
          <div className="forget">Forget password ?</div>
        </NavLink>

        <Button style={buttonStyle} type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>

        {/* Add any error handling if needed */}
        {/* {error && <div className="error">{error}</div>} */}

        <div className="forget">
          Don't have an account ?<NavLink style={{ width: '100%', textDecoration: 'none' }} to="/signup"> Create Account</NavLink>
        </div>
      </div>
    </form>
  );
};

export default Login;
