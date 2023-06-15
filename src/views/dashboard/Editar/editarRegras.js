import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const baseUrl = "https://jogatanas-api.onrender.com/regras";

export default function EditarRegras() {
  const navigate = useNavigate();
  const [dataRegra, setdataRegra] = useState("");
  const [campRegra, setcampRegra] = useState("");
  const [campDescricao, setcampDescricao] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [alertType, setAlertType] = useState("");
  const { regraId } = useParams();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = baseUrl + "/" + regraId;
        const response = await axios.get(url);
        const { success, data } = response.data;
        if (success) {
          if (data && data.length > 0) {
            const regra = data[0];
            setdataRegra(regra);
            setcampRegra(regra.regra);
            setcampDescricao(regra.descricao);
          } else {
            setMessage("Nenhuma regra encontrada");
            setMessageType("warning");
          }
        } else {
          setMessage("Error web service");
          setMessageType("danger");
        }
      } catch (error) {
        setMessage("Error server: " + error.message);
        setMessageType("danger");
      }
    };

    fetchData();
  }, [regraId]);

  function SendUpdate() {
    const url = baseUrl + "/update/" + regraId;

    const data = { regra: campRegra, descricao: campDescricao };

    axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.data.success === true) {
          setMessage(response.data.message);
          setMessageType("success");
          setAlertType("success");
        } else {
          setMessage("Error");
          setMessageType("danger");
          setAlertType("danger");
        }
      })
      .catch(error => {
        setMessage("Error: " + error);
        setMessageType("danger");
        setAlertType("danger");
      });
  }

  useEffect(() => {
    let timeout;

    if (alertType === "success") {
      timeout = setTimeout(() => {
        navigate("/dashboard/listar-regras");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerER m-5">
      <div className='dashboardTitulos mb-5'><h2>Editar regra</h2></div>
      <div className="form-row justify-content-center">
      
        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputRegra" className="visually-hidden">Regra</label>
          <input
            type="text"
            className="form-control"
            placeholder="Regra"
            value={campRegra}
            onChange={event => setcampRegra(event.target.value)}
          />
        </div>

        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputDescricao" className="visually-hidden">Descrição</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descrição"
            value={campDescricao}
            onChange={event => setcampDescricao(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-light btn-lg btn-block"
          onClick={SendUpdate}
        >
          Atualizar regra
        </button>
        {message && (
          <div className={`alert alert-${messageType} mt-5 col-md-6`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
