import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
//import './Login.css'; // Optional, for styling
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });
      console.log('Response:', response.data.token);
       localStorage.setItem('token', response.data.token);
      // Redirect or update state as needed
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'That email and password combination is incorrect');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError('An unexpected error occurred');
      }
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
