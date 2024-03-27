import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import AddProduct from "./pages/dashboard/AddProduct.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token && password === "pistol") {
        // Login successful
        toast.success('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('Id', email);
        localStorage.setItem('Password', password);
        setIsLoggedIn(true);
      } else if (password !== "pistol") {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in. Please try again later.');
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('Id');
    localStorage.removeItem('Password');
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  useEffect(() => {
    // Prevent user from going back when on the root page
    const handleBackButton = (event) => {
      if (window.location.pathname === "/") {
        event.preventDefault();
        window.history.forward();
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
        <Route path="/home" element={<Home products={products} setProducts={setProducts} handleLogOut={handleLogOut} isLoggedIn={isLoggedIn} />} />
        <Route path="/addProduct" element={<AddProduct products={products} onAdd={handleAddProduct} />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
