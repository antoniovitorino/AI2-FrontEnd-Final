import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Página não encontrada';
  }, []);

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
};

export default NotFoundPage;
