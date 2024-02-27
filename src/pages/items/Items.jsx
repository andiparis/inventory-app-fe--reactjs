// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../layouts/Layout';

function Items() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [formData, setFormData] = useState({
    item_code: '',
    name: '',
    price: '',
    min_stock: '',
    description: '',
  });
  const [editFormData, setEditFormData] = useState({
    _method: 'PUT',
    name: item.name,
    price: item.price,
    min_stock: item.min_stock,
    description: item.description,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.get('http://localhost:8000/api/items').then((response) => {
      setItems(response.data.data);
    });
  };

  const fetchDataById = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios
      .get(`http://localhost:8000/api/items/${selectedItemId}`)
      .then((response) => {
        setItem(response.data.data);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(
        'http://localhost:8000/api/items',
        formData
      );
      console.log(response.data);
      setFormData({
        item_code: '',
        name: '',
        price: '',
        min_stock: '',
        description: '',
      });

      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItemId(item.id);
    setEditFormData({
      id: item.id,
      item_code: item.item_code,
      name: item.name,
      price: item.price,
      min_stock: item.min_stock,
      description: item.description,
    });
    setIsEditing(true);
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(
        `http://localhost:8000/api/items/${selectedItemId}`,
        editFormData
      );
      console.log(response.data);

      setEditFormData({
        id: '',
        item_code: '',
        name: '',
        price: '',
        min_stock: '',
        description: '',
      });

      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemCode) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.delete(`http://localhost:8000/api/items/${itemCode}`);
      console.log(`Item with item_code ${itemCode} deleted`);
      setItems(items.filter((item) => item.item_code !== itemCode));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-plus"></i> Add Item
                  </button>
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
                                  {Number(item.price).toLocaleString('id-ID')}
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
                                <div className="d-flex gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-sm bg-gradient-warning"
                                    onClick={() => handleEdit(item.item_code)}
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm bg-gradient-danger"
                                    onClick={() => handleDelete(item.item_code)}
                                  >
                                    <i className="fas fa-trash"></i> Delete
                                  </button>
                                </div>
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

        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: 'block' }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Item</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Item Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="item_code"
                        value={formData.item_code}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nama</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Harga</label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Min Stok</label>
                      <input
                        type="text"
                        className="form-control"
                        name="min_stock"
                        value={formData.min_stock}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Deskripsi</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Editing */}
        {isEditing && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: 'block' }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Item</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsEditing(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nama</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Harga</label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Min Stok</label>
                      <input
                        type="text"
                        className="form-control"
                        name="min_stock"
                        value={editFormData.min_stock}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Deskripsi</label>
                      <textarea
                        name="description"
                        cols="30"
                        rows="10"
                        className="form-control"
                        onChange={handleEditInputChange}
                      >
                        {editFormData.description}
                      </textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Items;
