import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="navbar">

<div className="container-fluid px-5 py-3 ">
  <div> 
          <p><span className="text-light">2023 Joganas - Trabalho de: António Vitorino (21068) & Inês Mateus (17945)  </span></p>
          <p><span className="text-light">IPV | ESTGV | TDM | AI2 | Professores: Frederico Fonseca, Steven Abrantes e Tiago Rebelo</span></p>
          </div>
          <div>
          <Link to="/termos" className="btn btn-outline-light" tabIndex="1" role="button">Termos & Condições</Link>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
