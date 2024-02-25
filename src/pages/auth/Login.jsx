// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await axios
      .post('http://127.0.0.1:8000/api/login', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
        navigate('/');
      })
      .catch((error) => {
        setValidation(error.response.data.message);
      });
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="./images/auth.webp"
              className="img-fluid"
              alt="Auth image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={loginHandler}>
              <h1 className="d-flex align-items-center justify-content-center mb-4">
                Login
              </h1>

              {validation && (
                <div className="alert alert-warning">{validation}</div>
              )}
              <div className="form-floating mb-2">
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>
              {validation.email && (
                <div className="alert alert-danger">{validation.email[0]}</div>
              )}
              <div className="form-floating mb-2">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              {validation.password && (
                <div className="alert alert-danger">
                  {validation.password[0]}
                </div>
              )}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-4">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account?{' '}
                  <a href="/register" className="link-secondary">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
