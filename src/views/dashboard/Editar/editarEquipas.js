import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const baseUrl = "https://jogatanas-api.onrender.com";

export default function EditarEquipas() {
  const navigate = useNavigate();
  const [dataEquipa, setdataEquipa] = useState("");
  const [campNome, setcampNome] = useState("");
  const [campNumAluno, setcampNumAluno] = useState("");
  const [campBiografia, setcampBiografia] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectCargo, setselectCargo] = useState("");
  const [cargos, setCargos] = useState([]);
  const [message, setMessage] = useState({ success: null, text: "" });
  const [alertType, setAlertType] = useState("");
  const { equipaId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipeUrl = baseUrl + "/equipas/" + equipaId;
        const cargosUrl = baseUrl + "/cargos";

        const [equipeResponse, cargosResponse] = await Promise.all([
          axios.get(equipeUrl),
          axios.get(cargosUrl)
        ]);

        const equipeData = equipeResponse.data;
        const cargosData = cargosResponse.data;

        if (equipeData.success) {
          const equipe = equipeData.data[0];
          setdataEquipa(equipe);
          setcampNome(equipe.nome);
          setcampNumAluno(equipe.numero_aluno);
          setcampBiografia(equipe.biografia);
          setselectCargo(equipe.cargoId.toString());
        } else {
          alert("Error web service");
        }

        if (cargosData.success) {
          setCargos(cargosData.data);
        } else {
          alert("Erro ao recuperar cargos");
        }
      } catch (error) {
        alert("Error server: " + error);
      }
    };

    fetchData();
  }, [equipaId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function SendUpdate() {
    const url = baseUrl + "/equipas/update/" + equipaId;
    const formData = new FormData();
    formData.append("nome", campNome);
    formData.append("numero_aluno", campNumAluno);
    formData.append("biografia", campBiografia);
    formData.append("cargo", selectCargo);

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
        navigate("/dashboard/listar-equipas");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerEE m-5">
      <div className="row">
      <div className='dashboardTitulos mb-5'><h2>Editar membro da equipa</h2></div>
        <div className="col-md-6">
          <div className="form-row justify-content-center">   
            <div className="form-group mb-4">
              <label htmlFor="inputNome" className="visually-hidden">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={campNome}
                onChange={event => setcampNome(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputNumAluno" className="visually-hidden">N.º Aluno</label>
              <input
                type="text"
                className="form-control"
                placeholder="Numéreo Aluno"
                value={campNumAluno}
                onChange={event => setcampNumAluno(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputBiografia" className="visually-hidden">Biografia</label>
              <input
                type="text"
                className="form-control"
                placeholder="Biografia"
                value={campBiografia}
                onChange={event => setcampBiografia(event.target.value)}
              />
            </div>
            <div className="form-group  mb-4">
              <label htmlFor="inputFoto" className="visually-hidden">Nova foto</label>
              <input
                type="file"
                className="form-control"
                id="inputFoto"
                accept=".jpg,.png,.jpeg"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group  mb-4">
              <label htmlFor="inputCargo" className="visually-hidden">Cargo</label>
              <select
                id="inputCargo"
                className="form-control"
                value={selectCargo}
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
            className="btn btn-outline-light btn-lg btn-block mb-4"
            onClick={SendUpdate}>Atualizar equipa</button>
          {message.text && (
            <div
              className={`alert mt-5 ${message.success ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message.text}
            </div>
          )}
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="inputFoto" className="visually-hidden">Foto atual</label>
                {dataEquipa.fotoId && <img src={`https://jogatanas-api.onrender.com/midia/${dataEquipa.fotoId}`} className="rounded" alt="foto atual" style={{ width: '300px', height: 'auto' }} />}
              </div>
        </div>
      </div>
    </div>

  );
}
