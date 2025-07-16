import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register-wrapper">
      <form className="register-form">
        <h2 className="register-title">Create an Account</h2>

        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" className="register-btn">Register</button>

        <p className="switch-page">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
