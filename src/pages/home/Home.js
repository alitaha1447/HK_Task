import React, { useState } from 'react';
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import '../home/Home.css';

function Home({ products, setProducts, handleLogOut, isLoggedIn }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSubmit = () => {
    handleLogOut();
  }

  if (!isLoggedIn) {
    navigate('/');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  const handleDelete = (index) => {
    // Filter out the product with the given index
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    // Also update filtered products if needed
    setFilteredProducts(updatedProducts);
  }

  const Id = localStorage.getItem('Id');
  const userName = Id ? (Id.includes('@') ? Id.substr(0, Id.indexOf('@')) : Id) : '';

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ height: "60px" }}>
        <div className="container-fluid">
          <span className="navbar-brand" style={{ fontSize: "1.8rem", color: "white" }}>Navbar</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/addProduct" className="nav-link active" style={{ fontSize: "1.5rem", color: "white" }}>Add Product</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <div>
                <IoLogOut onClick={handleSubmit} className='logOut' />
              </div>
              <span className="ms-2" style={{ fontSize: "1.5rem", color: "white" }}>{userName}</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className='product'>
          <h2>Product List</h2>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found !!!</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <MdDelete onClick={() => handleDelete(index)} className="delete-icon" />
                    {console.log(index)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;
