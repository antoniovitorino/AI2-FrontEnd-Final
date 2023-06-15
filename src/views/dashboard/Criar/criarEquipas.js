import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

export default function CriarEquipas() {
  const navigate = useNavigate(); 
  const [campNome, setcampNome] = useState("");
  const [campNumAluno, setcampNumAluno] = useState("");
  const [campBiografia, setcampBiografia] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [selectCargo, setselectCargo] = useState("");
  const [cargos, setCargos] = useState([]);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    axios.get("https://jogatanas-api.onrender.com/cargos")
      .then(response => {
        if (response.data.success) {
          setCargos(response.data.data);
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
    if (selectCargo === "") {
      setMessage("Escolher cargo!");
      setAlertType("danger");
    } else if (campNome === "") {
      setMessage("Inserir nome!");
      setAlertType("danger");
    } else if (campNumAluno === "") {
      setMessage("Inserir número aluno!");
      setAlertType("danger");
    } else if (campBiografia === "") {
      setMessage("Inserir biografia!");
      setAlertType("danger");
    } else if (selectedFile === null) {
      setMessage("Selecionar uma imagem!");
      setAlertType("danger");
    } else {
      const baseUrl = "https://jogatanas-api.onrender.com/equipas/create";
      const formData = new FormData();
      formData.append("nome", campNome);
      formData.append("numero_aluno", campNumAluno);
      formData.append("biografia", campBiografia);
      formData.append("foto", selectedFile);
      formData.append("cargo", selectCargo);

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
        setMessage("Erro ao salvar membro da equipa.");
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
        navigate('/dashboard/listar-equipas');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerCE m-5">
      <div className="row">
        <div className="col-md-6">
          <div className="form-row justify-content-center">
          <div className='dashboardTitulos mb-3'><h2>Criar membro da equipa</h2></div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputNome" className="visually-hidden">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={campNome}
                onChange={event => setcampNome(event.target.value)}
              />
            </div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputNumAluno" className="visually-hidden">N.º Aluno</label>
              <input
                type="text"
                className="form-control"
                placeholder="numero_aluno"
                value={campNumAluno}
                onChange={event => setcampNumAluno(event.target.value)}
              />
            </div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputBiografia" className="visually-hidden">Biografia</label>
              <input
                type="text"
                className="form-control"
                placeholder="Biografia"
                value={campBiografia}
                onChange={event => setcampBiografia(event.target.value)}
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
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputCargo" className="visually-hidden">Cargo</label>
              <select
                id="inputCargo"
                className="form-control"
                onChange={event => setselectCargo(event.target.value)}
              >
                <option defaultValue>Escolher cargo na equipa</option>
                {cargos.map((cargo, index) => (
                  <option key={index} value={cargo.id}>{cargo.cargo}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-light btn-lg btn-block"
            onClick={SendSave}
          >
            Gravar novo membro
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