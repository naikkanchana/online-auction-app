import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Register.css'; // Optional, for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try{
      const response = await axios.post('http://localhost:3001/api/auth/register',{username,email,password})
      console.log('Registration response:', response.data);
      // After successful registration, navigate to the login page
      navigate('/'); // Change this to your login route if different
      
    }catch(error){
      if (error.response) {
        // Handle server error responses
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Registration failed');
      } else {
        // Handle any other errors
        console.error('Error message:', error.message);
        setError('An unexpected error occurred');
      }
    }
    // Add your registration logic here, e.g., API call
    console.log('Registered Username:', username);
    console.log('Registered Password:', password);
    console.log('Registered Email:', email); // Log email for debugging

    // After successful registration, navigate to login page
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" // Change input type to email
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
        <div>
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
