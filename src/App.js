import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import Cliente from './views/cliente/index'
import Dashboard from './views/dashboard/index'
import AuthService from "./auth-service"; 

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [currentUser, setcurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser(); 
    if (user) {
    setcurrentUser({ currentUser: user }); }
    }, [location]);

    const logOut = () => { 
      AuthService.logout();
    }

    return (
    <>
      <Routes>
        <Route path="/" element={<Cliente.Home />} />
        <Route path="/login" element={<Cliente.Login />} />
        <Route path="/termos" element={<Cliente.Termos />} />
        <Route path="/dashboard/*" element={<Dashboard.Home />} />
      </Routes>
    </>
  );
}

export default App;
