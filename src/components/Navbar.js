/*
O componente Navbar é definido como um componente React.
O ícone LockOpen é importado do @mui/icons-material para exibir o ícone.
O componente Link é importado do react-router-dom para criar links para outras rotas da aplicação.
O componente Navbar renderiza uma barra de navegação.
O nav possui a classe navbar.
O Link com a classe navbar-brand redireciona para a rota inicial ("/") e exibe um logo.
O Link com a classe btn btn-outline-light redireciona para a rota de login ("/login").
O componente Navbar é exportado como o componente padrão.
*/

import React from "react";
import LockOpen from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <img src="/imagens/logo.png" width="150px" className="d-inline-block align-top" alt="Logo MovieRise" />
        </Link>
        <Link to="/login" className="btn btn-outline-light" tabIndex="1" role="button">
          <LockOpen className="logout" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;