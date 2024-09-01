import React from 'react';

const SignUp = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <div className="signup-card">
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSignUp}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input className="form-control custom-input" type="text" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone no</label>
                <input className="form-control custom-input" type="text" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Create Password</label>
                <input className="form-control custom-input" type="password" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input className="form-control custom-input" type="text" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control custom-input" type="email" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input className="form-control custom-input" type="password" required />
              </div>
            </div>
          </div>
          <button type="submit" className="btn custom-button w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
