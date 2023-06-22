/*
Este código define uma aplicação React que usa o React Router para lidar com as rotas. 
O componente App envolve todo a aplicação com o React Router e o componente AppContent 
define as rotas e o conteúdo da aplicação. Utiliza o estado local (useState) para 
armazenar o utilizador atual e os hooks useEffect para buscar e atualizar o utilizador com 
base no AuthService e no localStorage. O componente AppContent também define as rotas e 
associa cada rota a um componente específico a ser renderizado com base na URL.
*/

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Cliente from './views/cliente/index';
import Dashboard from './views/dashboard/index';
import NotFoundPage from './views/404/index';
import AuthService from "./auth-service";

// O componente principal da aplicação que envolve tudo com o React Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  // O hook useEffect é usado para buscar o utilizador atual no AuthService
  // Sempre que a localização (URL) muda, verifica se o utilizador está logado e atualiza o estado

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, [location]);

  // O hook useEffect é usado para buscar o utilizador atual no localStorage
  // Quando o componente AppContent é montado, ele verifica se há um utilizador armazenado no localStorage e atualiza o estado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
    }
  }, []);

   // Função que efetua logout, chamando o método logout do AuthService
  const logOut = () => {
    AuthService.logout();
  };

  // O componente AppContent define as rotas da aplicação utilizando o componente Routes do React Router
  // Cada rota está associada a um componente específico a ser exibido com base na URL
  return (
    <>
      <Routes>
        <Route path="/" element={<Cliente.Home />} />
        <Route path="/login" element={<Cliente.Login />} />
        <Route path="/termos" element={<Cliente.Termos />} />
        <Route path="/dashboard/*" element={<Dashboard.Home />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

// Exporta o componente App como padrão (default) para ser utilizado em outros módulos
export default App;