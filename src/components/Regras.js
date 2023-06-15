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
        <div className="col-lg-3 col-md-12 mb-5" key={regra.id}>
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
