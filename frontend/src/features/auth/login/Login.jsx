import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h2 className="login-title">Welcome Back</h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>

        <div className="form-meta">
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        </div>

        <button type="submit" className="login-btn">Login</button>

        <p className="switch-page">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
