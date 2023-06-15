import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Página não encontrada';
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>404 - Página não encontrada</h1>
        <p>A página que procura não existe.</p>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
