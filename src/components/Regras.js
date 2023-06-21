import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegrasComponent = () => {
  const [regrasData, setRegrasData] = useState([]);

  useEffect(() => {
    const fetchRegrasData = async () => {
      try {
        const response = await axios.get('https://jogatanas-api.onrender.com/regras');
        const data = response.data.data;
        setRegrasData(data);
      } catch (error) {
        console.log('Error fetching regras data:', error);
      }
    };

    fetchRegrasData();
  }, []);

  return (

    <div className="container-fluid px-5 py-3">
    <div className="text-start text-light mb-5"><h1 >Regras do jogo</h1></div>
      <div className="row">
      {regrasData.map((regra) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-5" key={regra.id}>
          <div className="card "> 
            <div className="card-body text-bg-secondary">
              <h4 className="card-title">{regra.regra}</h4>
              <p className="card-title">{regra.descricao}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default RegrasComponent;


/*
O componente RegrasComponent é definido como uma função React.
Utiliza o useState para armazenar os dados das regras do jogo.
O useEffect é utilizado para fazer uma requisição assíncrona e obter os dados das regras da API.
Os dados das regras são armazenados no estado regrasData usando o setRegrasData.
Dentro de cada coluna, é renderizado um card que contém o título da regra (regra.regra) e a descrição da regra (regra.descricao).
O componente RegrasComponent é exportado como o componente padrão.
*/