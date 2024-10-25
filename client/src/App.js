import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import AuctionPage from './components/AuctionPage';
import Login from './components/Login'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" Component={Login}/>
      <Route path="/register" Component={Register} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="user" Component={UserProfile}/>
      </Routes>
    </Router>
  );
}

export default App;
