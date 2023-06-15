import React, { useEffect, useState } from "react";
import "../assets/style.css";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from '../auth-service'; 
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Top = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userObject = AuthService.getCurrentUser(); 
    if (userObject && userObject.token) {
      const user = jwtDecode(userObject.token);
      
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topleft">
            <a href="/dashboard/"><img src="/imagens/logo.png" width="100px" className="logo" alt="Logo AfterEnd" /></a>
            <span className="topTitulo">DASHBOARD by jogatanas</span>
            </div>         
            <div className="topright">
                {currentUser && <span className="welcome">Olá, <b>{currentUser.name}</b>!</span>}
                <span className="sair">Logout</span>
                <button onClick={handleLogout} className="btn btn-outline-light" tabIndex="1" role="button">
                  <LogoutIcon className="logout" />
                </button>
              </div>
        </div>
    </div>
  );
};

export default Top;
