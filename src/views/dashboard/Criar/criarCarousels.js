import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

export default function CriarCarousels() {
  const navigate = useNavigate(); 
  const [campTitulo, setcampTitulo] = useState("");
  const [campDescricao, setcampDescricao] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    axios.get("https://jogatanas-api.onrender.com/carousels")
      .then(response => {
        if (response.data.success) {
          
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const SendSave = () => {
    if (campTitulo === "") {
      setMessage("Inserir titulo!");
      setAlertType("danger");
    } else if (campDescricao === "") {
      setMessage("Inserir descrição!");
      setAlertType("danger");
    } else if (selectedFile === null) {
      setMessage("Selecionar uma imagem!");
      setAlertType("danger");
    } else {
      const baseUrl = "https://jogatanas-api.onrender.com/carousels/create";
      const formData = new FormData();
      formData.append("titulo", campTitulo);
      formData.append("descricao", campDescricao);
      formData.append("foto", selectedFile);

      axios.post(baseUrl, formData)
      .then(response => {
        console.log(response.data)
        if (response.data.success === true) {
          setMessage(response.data.message);
          setAlertType("success");
        } else {
          setMessage(response.data.message);
          setAlertType("danger");
        }
      }).catch(error => {
        setMessage("Erro ao salvar slide.");
        setAlertType("danger");
      });
    }
  };


  useEffect(() => {
    let timeout;

    if (alertType === 'success') {
      timeout = setTimeout(() => {
        setMessage('');
        setAlertType('');
        navigate('/dashboard/listar-carousels');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerCE m-5">
      <div className="row">
        <div className="col-md-6">
          <div className="form-row justify-content-center">
          <div className='dashboardTitulos mb-5'><h2>Criar slide</h2></div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputTitulo" className="visually-hidden">Título</label>
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                value={campTitulo}
                onChange={event => setcampTitulo(event.target.value)}
              />
            </div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputDescricao" className="visually-hidden">Descrição</label>
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                value={campDescricao}
                onChange={event => setcampDescricao(event.target.value)}
              />
            </div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputFoto" className="visually-hidden">Foto</label>
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
            className="btn btn-outline-light btn-lg btn-block"
            onClick={SendSave}
          >
            Gravar novo slide
          </button>
          {message && (
            <div className={`alert alert-${alertType} mt-5`} role="alert">
              {message}
            </div>
          )}
        </div>
        <div className="col-md-6">
          {previewSource && (
            <img src={previewSource} alt="chosen" className="rounded" style={{ width: '300px', height: 'auto' }} />
          )}
        </div>
      </div>
    </div>
  );
}

//
