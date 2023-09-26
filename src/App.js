import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register/Register';
import LogIn from './pages/LogIn';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() 
{
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/Admin" element={<AdminDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
