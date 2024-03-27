// AddProduct.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../dashboard/AddProduct.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct({ products, onAdd }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  console.log(products)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim() || !price.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }

    // Check for duplicacy
    if (products.some(product => product.productName.toLowerCase() === productName.toLowerCase())) {
      toast.error("Product with this name already exists.");
      return;
    }

    onAdd({ productName, price: parseFloat(price) });
    navigate('/home')
    setProductName('');
    setPrice('');
  };

  return (
    <div className="add-product-wrapper">
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add</button>
          <Link to="/home">Back to Home</Link>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
