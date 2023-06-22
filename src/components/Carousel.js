/*
O componente Carousel é definido como um componente React.
Os hooks useState e useEffect são utilizados para gerir o estado e os efeitos colaterais.
A função shuffle da biblioteca Lodash é importada para embaralhar (random) os dados do carousel.
O estado carouselData é definido como uma matriz vazia para armazenar os dados do carousel.
O estado activeIndex é definido como 0 para rastrear o índice do item ativo no carousel.
O hook useEffect é utilizado para buscar os dados do carousel a partir da API assim que o componente é montado.
A função fetchCarouselData é definida como uma função assíncrona para fazer a chamada à API e atualizar o estado 
carouselData com os dados retornados.
O hook useEffect também é utilizado para criar um intervalo que altera o índice ativo do carousel a cada 5 segundos.
A função de retorno renderiza o JSX para exibir o carousel com os dados obtidos.
A propriedade carouselData é mapeada para gerar os itens do carousel.
A classe active é adicionada ao item cujo índice corresponde ao activeIndex.
A imagem do item é exibida se item.fotoId estiver definido.
O título e a descrição do item são exibidos no carousel-caption.
Os botões de controle anterior e seguinte são renderizados para navegar entre os itens do carousel.
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { shuffle } from "lodash";

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get("https://jogatanas-api.onrender.com/carousels");
        const data = response.data.data;
        setCarouselData(shuffle(data));
      } catch (error) {
        console.log("Error fetching carousel data:", error);
      }
    };

    fetchCarouselData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevActiveIndex) => (prevActiveIndex === carouselData.length - 1 ? 0 : prevActiveIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselData]);

  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">
        {carouselData.map((item, index) => (
          <div
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            key={item.id}
          >
            {item.fotoId && (
              <img
                src={`https://jogatanas-api.onrender.com/midia/${item.fotoId}`}
                className="d-block w-100"
                alt={item.titulo}
              />
            )}
            <div className="carousel-caption d-none d-md-block">
              <h3>{item.titulo}</h3>
              <h5>{item.descricao}</h5>
            </div>
          </div>
        ))}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Seguinte</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
