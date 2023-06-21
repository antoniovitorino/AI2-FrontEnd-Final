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
    
    <div className="container-fluid px-5 py-3 sobre marginFooter">
      <div className="text-start text-light mb-5"><h1 >Equipa Jogatanas</h1></div>
        <div className="row">
        
          {equipas.slice(0, 12).map(equipa => (
          <div className="col-lg-2 col-md-6 col-sm-6 col-xs-12 col-mb-5" key={equipa.id}>
            <Tilt options={defaultOptions}>
            <div className="card ">
              <img className="card-img-top" src={`https://jogatanas-api.onrender.com/midia/${equipa.fotoId}`} alt={equipa.nome} />  
              <div className="card-body text-bg-dark">
                <h5 className="card-title">{equipa.nome}</h5>
                <p>Aluno n.º {equipa.numero_aluno}</p>
                <p>{equipa.cargo.cargo}</p>
                <p>{equipa.biografia}</p>
              </div>
            </div>
            </Tilt>
          </div>
        ))}
        
      </div>
    </div>

  );
};

export default Equipas;


/*
O componente Equipas é definido como um componente React.
Os hooks useState e useEffect são utilizados para gerir o estado e os efeitos colaterais.
As constantes defaultOptions e customOptions são definidas para configurar as opções do componente Tilt.
O estado equipas é definido como uma matriz vazia para armazenar os dados das equipas.
O hook useEffect é utilizado para buscar os dados das equipas a partir da API assim que o componente é montado.
A função fetchEquipas é definida como uma função assíncrona para fazer a chamada à API e atualizar o estado equipas com os dados retornados.
O componente Tilt é utilizado para aplicar um efeito de inclinação aos cards das equipas.
A propriedade options do componente Tilt é definida como defaultOptions para aplicar as configurações padrão.
Os dados das equipas são mapeados para renderizar os cards no layout da grelha.
Cada card exibe o nome da equipa, o número do aluno, o cargo e a biografia.
A imagem da equipa é exibida com base no URL retornado pela API.
O número máximo de equipas exibidas é limitado a 12 usando o método slice na matriz equipas.
O componente Equipas é exportado como o componente padrão.
*/