// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../layouts/Layout';

function Items() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.get('http://localhost:8000/api/items').then((response) => {
      setItems(response.data.data);
    });
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    fetchData();
  }, []);

  return (
    <>
      <Layout />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          data-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Inventaris
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Inventaris</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <ul className="navbar-nav justify-content-end gap-3">
                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a
                      href="javascript:;"
                      className="nav-link text-body p-0"
                      id="iconNavbarSidenav"
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="fas fa-bars"></i>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">
                      List Item
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Kode Item
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Nama
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Harga
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Stok
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Min Stok
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td className="align-middle">
                                <p className="text-secondary text-xs font-weight-normal px-3 py-1">
                                  {item.item_code}
                                </p>
                              </td>
                              <td className="align-middle">
                                <p className="text-secondary text-xs font-weight-normal px-3 py-1">
                                  {item.name}
                                </p>
                              </td>
                              <td className="align-middle">
                                <p className="text-secondary text-xs font-weight-normal px-3 py-1">
                                  {item.price}
                                </p>
                              </td>
                              <td className="align-middle">
                                <p className="text-secondary text-xs font-weight-normal px-3 py-1">
                                  {item.stock}
                                </p>
                              </td>
                              <td className="align-middle">
                                <p className="text-secondary text-xs font-weight-normal px-3 py-1">
                                  {item.min_stock}
                                </p>
                              </td>
                              <td className="align-middle">
                                <p className="text-secondary text-xs font-weight-normal px-3 py-1">
                                  <a
                                    href="/inventaris/edit/"
                                    className="btn btn-sm bg-gradient-warning"
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </a>
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Items;
