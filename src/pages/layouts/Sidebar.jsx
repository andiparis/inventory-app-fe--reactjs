// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logoutHanlder = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios
      .post('http://localhost:8000/api/logout')
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <div className="navbar-brand m-0">
          <h4 className="ms-1 font-weight-bold text-white text-center">
            Inventory App
          </h4>
        </div>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              activeClassName="active bg-gradient-primary"
              exact
              to="/"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              activeClassName="active bg-gradient-primary"
              exact
              to="/inventaris"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-warehouse"></i>
              </div>
              <span className="nav-link-text ms-1">Inventaris</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              activeClassName="active bg-gradient-primary"
              exact
              to="/manajemen-stok"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-cubes"></i>
              </div>
              <span className="nav-link-text ms-1">Manajemen Stok</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              activeClassName="active bg-gradient-primary"
              exact
              to="/pengiriman-barang"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-truck"></i>
              </div>
              <span className="nav-link-text ms-1">Pengiriman Barang</span>
            </NavLink>
          </li>
          <hr className="horizontal light mt-0 mb-2" />
          <li className="nav-item">
            <a className="nav-link text-white" href="#" onClick={logoutHanlder}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <span className="nav-link-text ms-1">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
