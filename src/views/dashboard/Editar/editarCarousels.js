import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const baseUrl = "https://jogatanas-api.onrender.com";

export default function EditarCarousels() {
  const navigate = useNavigate();
  const [dataCarousel, setdataCarousel] = useState("");
  const [campTitulo, setcampTitulo] = useState("");
  const [campDescricao, setcampDescricao] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState({ success: null, text: "" });
  const [alertType, setAlertType] = useState("");
  const { carouselId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carUrl = baseUrl + "/carousels/" + carouselId;

        const [carResponse] = await Promise.all([
          axios.get(carUrl),
        ]);

        const carData = carResponse.data;

        if (carData.success) {
          const car = carData.data[0];
          setdataCarousel(car);
          setcampTitulo(car.titulo);
          setcampDescricao(car.descricao);
          setLoading(false);
        } else {
          alert("Error web service");
        }

      } catch (error) {
        alert("Error server: " + error);
      }
    };

    fetchData();
  }, [carouselId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function SendUpdate() {
    const url = baseUrl + "/carousels/update/" + carouselId;
    const formData = new FormData();
    formData.append("titulo", campTitulo);
    formData.append("descricao", campDescricao);

    if (selectedFile) {
      formData.append("foto", selectedFile, selectedFile.name);
    }

    axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        if (response.data.success === true) {
          setMessage({ success: true, text: response.data.message });
          setAlertType("success");
        } else {
          setMessage({ success: false, text: "Error" });
          setAlertType("danger");
        }
      })
      .catch(error => {
        setMessage({ success: false, text: "Error: " + error });
        setAlertType("danger");
      });
  }

  useEffect(() => {
    let timeout;

    if (alertType === "success") {
      timeout = setTimeout(() => {
        navigate("/dashboard/listar-carousels");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerEE m-5">
      <div className="row">
      <div className='dashboardTitulos mb-5'><h2>Editar slide</h2></div>
        <div className="col-md-6">
          <div className="form-row justify-content-center">
          
            <div className="form-group mb-4">
              <label htmlFor="inputTitulo" className="visually-hidden">Título</label>
              <input
                type="text"
                className="form-control"
                placeholder="Titulo"
                value={campTitulo}
                onChange={event => setcampTitulo(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputDescricao" className="visually-hidden">Descrição</label>
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                value={campDescricao}
                onChange={event => setcampDescricao(event.target.value)}
              />
            </div>
  
            <div className="form-group  mb-4">
              <label htmlFor="inputImagem" className="visually-hidden">Imagem Slide</label>
              <input
                type="file"
                className="form-control"
                id="inputFoto"
                accept=".jpg,.png,.jpeg"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-light btn-lg btn-block mb-4"
            onClick={SendUpdate}>Atualizar slide</button>
          {message.text && (
            <div
              className={`alert mt-5 ${message.success ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message.text}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-5">
          <div className="form-group">
            <label htmlFor="inputFoto" className="visually-hidden">Foto atual</label>
            {dataCarousel.fotoId && <img src={`${baseUrl}/midia/${dataCarousel.fotoId}`} className="rounded" alt="foto atual" style={{ width: '100%', height: 'auto' }} />}
            </div>
        </div>
      </div>
    </div>
  );
}
