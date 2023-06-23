/*
O componente NavBarOutras é definido como uma função React.
O componente NavBarOutras retorna o conteúdo do navbar para as outras páginas.
O a com a classe navbar-brand redireciona para a rota inicial ("/") e exibe um logo.
O componente NavBarOutras é exportado como o componente padrão.
*/

import React from 'react';

function NavBarOutras() {
  // Conteúdo do navbar para as outras páginas
  return (
    <nav className="navbar">
      <div className="container-fluid px-5">
        <div>
        <a className="navbar-brand" href="/">
          <img src="/imagens/logo.png" width="150px" className="d-inline-block align-top" alt="Logo MovieRise" />
        </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBarOutras;