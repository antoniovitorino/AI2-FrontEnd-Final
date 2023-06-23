/*
O componente Top é definido como uma função React.
Utiliza o hook useNavigate do React Router para permitir a navegação.
O estado currentUser é usado para armazenar as informações do utilizador atualmente logado.
O efeito useEffect é usado para verificar se o utilizador está logado e obter suas informações a partir do token.
A função handleLogout é chamada quando o botão de logout é clicado. Chama o método logout do serviço de autenticação 
e redireciona o utilizador para a página de login.
O retorno do componente é uma estrutura de layout que exibe o logotipo, o título e a saudação ao utilizador logado.
O botão de logout é renderizado com um ícone de logout e um evento de clique que chama a função handleLogout.
O componente Top é exportado como o componente padrão.
*/

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