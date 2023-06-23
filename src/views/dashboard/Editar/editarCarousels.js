/*
O estado dataCarousel armazena os dados do slide a ser editado, enquanto campTitulo e campDescricao armazenam os 
valores atualizados dos campos de título e descrição, respetivamente.
No useEffect inicial, é feita uma chamada assíncrona para buscar à API os dados do slide a partir do seu ID. Se a busca 
for bem-sucedida, os dados do slide são atualizados nos estados correspondentes.
A função handleFileChange é responsável por atualizar o estado selectedFile com o ficheiro selecionado pelo utilizador 
para atualização do slide.
A função SendUpdate é acionada quando o utilizador clica no botão "Atualizar slide". Envia uma requisição PUT para a API, 
atualizando os dados do slide, incluindo a imagem, se selecionada.
Outro useEffect é utilizado para redirecionar para a página de listar carousels após uma atualização bem-sucedida. Define 
um timeout para redirecionar após 2 segundos.
O componente renderiza um formulário com campos de texto para título e descrição do slide, e um campo de seleção de ficheiro 
para a imagem. Também exibe uma mensagem de sucesso ou erro, dependendo do resultado da atualização.
*/

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
      // Função assíncrona para buscar à API os dados do slide a ser editado
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
    // Função para enviar os dados atualizados do slide à API
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
    // useEffect para redirecionar para a página de listar carousels após uma atualização bem-sucedida
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
