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
