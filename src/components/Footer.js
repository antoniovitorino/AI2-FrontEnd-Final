/*
O componente Footer é definido como um componente React.
O componente Link é importado do react-router-dom para criar um link para a página de termos e condições.
O componente Footer renderiza um rodapé com informações sobre o projeto, os colaboradores, a instituição e os professores.
O botão "Termos & Condições" é renderizado usando o componente Link, que redireciona para a página de termos quando clicado.
O componente Footer é exportado como o componente padrão.
*/

import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="navbar">

<div className="container-fluid px-5 py-3 ">
  <div> 
          <p><span className="text-light">2023 Jogatanas</span></p>
          <p><span className="text-light">IPV | ESTGV | TDM | DJ | Professores: Frederico Fonseca e Nuno Carapito</span></p>
          </div>
          <div>
          <Link to="http://193.137.7.33/~estgv20449/Jogos/ProjetoWebGL/WEBGL/" className="btn btn-outline-light" tabIndex="1" role="button">Jogar online</Link>
          </div>
      </div>
    </footer>
  );
};

export default Footer;