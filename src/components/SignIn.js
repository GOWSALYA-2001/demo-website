import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css'
const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(`/admin`);
  };

  return (
    <div className="signin-container d-flex justify-content-center align-items-center">
      <div className="signin-card">
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input className="form-control custom-input" type="text" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control custom-input" type="password" required />
          </div>
          <button type="submit" className="btn custom-buttons w-100 mb-3">Login</button>
          <div className="text-center">
            <Link to="/signup" className="custom-link">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
