import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login/Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ isLoggedIn, handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password.');
      return;
    }
    handleLogin(email, password)
  }

  useEffect(() => {
    // Function to prevent default paste behavior
    const preventPasteNavigation = (event) => {
      // Check if paste event happens in password input
      if (event.target.id === 'password-input') {
        event.preventDefault();
      }
    };

    // Add event listener for paste event
    document.addEventListener('paste', preventPasteNavigation);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('paste', preventPasteNavigation);
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount


  if (isLoggedIn) {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }
  return (
    <div className="login-container">
      <div className='login-box'>
        <div className="login-box-container">
          <h1>Log In</h1>
          <div className="login-input-container">
            <input type="email" placeholder="Email or Phone" name="email" onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
            <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} required autoComplete="off" />
          </div>
          <button className="login-button" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
