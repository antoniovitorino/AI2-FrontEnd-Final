import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';

const Equipas = () => {

  const [equipas, setEquipas] = useState([]);

  useEffect(() => {
    const fetchEquipas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/equipas');
        const data = response.data.data;
        setEquipas(shuffle(data));
      } catch (error) {
        console.log('Error fetching equipas:', error);
      }
    };
  
    fetchEquipas();
  }, []);

  return (
    <div className="container-fluid px-5 py-3 sobre marginFooter">
      <div className="text-start text-light mb-5"><h1 >Equipa Jogatanas</h1></div>
        <div className="row">
          {equipas.slice(0, 12).map(equipa => (
          <div className="col-lg-2 col-md-12 mb-5" key={equipa.id}>
            <div className="card ">
              <img className="card-img-top" src={`http://localhost:4000/midia/${equipa.fotoId}`} alt={equipa.nome} />  
              <div className="card-body text-bg-dark">
                <h5 className="card-title">{equipa.nome}</h5>
                <p>Aluno n.º {equipa.numero_aluno}</p>
                <p>{equipa.cargo.cargo}</p>
                <p>{equipa.biografia}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipas;
