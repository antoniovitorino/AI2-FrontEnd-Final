import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { Tilt } from 'react-tilt'

const defaultOptions = {
reverse: false,
max: 35,
perspective: 1000,
scale: 1.1, 
speed: 1000,
transition: true,
axis: null,
reset: true,
easing: "cubic-bezier (.03, .98, 52, .99)",
}

const customOptions = {
reverse: true, 
max: 45, 
perspective: 1500, 
scale: 1.2, 
speed: 2000,
transition: true, 
axis: "X", 
reset: false,
easing: "cubic-bezier(.2, .8, .3, 1)"
};




const Equipas = () => {

  const [equipas, setEquipas] = useState([]);

  useEffect(() => {
    const fetchEquipas = async () => {
      try {
        const response = await axios.get('https://jogatanas-api.onrender.com/equipas');
        const data = response.data.data;
        setEquipas(shuffle(data));
      } catch (error) {
        console.log('Error fetching equipas:', error);
      }
    };
  
    fetchEquipas();
  }, []);

  return (
    <Tilt options={defaultOptions}>
    <div className="container-fluid px-5 py-3 sobre marginFooter">
      <div className="text-start text-light mb-5"><h1 >Equipa Jogatanas</h1></div>
        <div className="row">
          {equipas.slice(0, 12).map(equipa => (
          <div className="col-lg-2 col-md-6 col-sm-6 col-xs-12 col-mb-5" key={equipa.id}>
            <div className="card ">
              <img className="card-img-top" src={`https://jogatanas-api.onrender.com/midia/${equipa.fotoId}`} alt={equipa.nome} />  
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
</Tilt>
  );
};

export default Equipas;
