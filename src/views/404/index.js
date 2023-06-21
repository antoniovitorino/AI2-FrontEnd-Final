// Importação dos módulos e componentes necessários
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

// Effect que define o título da página como "Página não encontrada"
const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Página não encontrada';
  }, []);


  // Exportação do componente NotFoundPage como o valor padrão do módulo
  return (
    <>
      <Navbar />

      // Renderização do componente Navbar

      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center row">
          <div className="col-md-6">
            <img src="/imagens/404.png" alt="404" className="img-fluid" />
          </div>
          <div className="col-md-6 mt-5">
            <p className="fs-3">
              <span className="text-danger">Opps! </span><span className="dashboardTitulos">Página não encontrada</span>
            </p>
            <p className="lead dashboardTitulos">A página que procura não existe.</p>
            <Link to="/" className="btn btn-outline-light btn-lg btn-block">
              Início
            </Link>
          </div>
        </div>
      </div>

      // Estrutura da página de "Página não encontrada", com uma imagem, título e botão de voltar para o início

      <Footer />

      // Renderização do componente Footer
    </>
  );
};

export default NotFoundPage;


/*
O componente NotFoundPage renderiza uma página "404". 
Importa os módulos e componentes necessários, como React, useEffect, Navbar, Footer e Link.
Dentro do componente, há um efeito (useEffect) que define o título da página como "Página não encontrada" ao 
montar o componente.
De seguida, a estrutura da página é renderizada, incluindo um componente Navbar, uma área centralizada que contém 
uma imagem de erro 404, um título de erro, uma mensagem explicativa e um botão de link para a página inicial.
Por fim, o componente Footer é renderizado.
O componente NotFoundPage é exportado como o valor padrão do módulo, permitindo que seja importado e utilizado 
noutros lugares da aplicação.
*/
