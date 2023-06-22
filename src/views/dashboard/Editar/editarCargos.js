/*
O estado dataCargo armazena os dados do cargo a ser editado, enquanto campCargo armazena o valor atualizado do campo de cargo.
No useEffect inicial, é feita uma chamada assíncrona para buscar à API os dados do cargo a partir do seu ID. Se a busca for 
bem sucedida, os dados do cargo são atualizados nos estados dataCargo e campCargo.
A função SendUpdate é acionada quando o utilizador clica no botão "Atualizar cargo na equipa". Envia uma requisição PUT para 
a API, atualizando o cargo com os dados fornecidos.
Outro useEffect é utilizado para redirecionar para a página de listar cargos após uma atualização bem-sucedida. Define um timeout 
para redirecionar após 2 segundos.
O componente renderiza um formulário com um campo de texto para o cargo e um botão de atualização. Também exibe uma mensagem de 
sucesso ou erro, dependendo do resultado da atualização.
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = "https://jogatanas-api.onrender.com/cargos";

export default function EditarCargos() {
  const navigate = useNavigate();
  const [dataCargo, setdataCargo] = useState("");
  const [campCargo, setcampCargo] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [alertType, setAlertType] = useState("");
  const { cargoId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Função assíncrona para buscar à API os dados do cargo a ser editado
      try {
        const url = baseUrl + "/" + cargoId;
        const response = await axios.get(url);
        const { success, data } = response.data;
        if (success) {
          const cargo = data[0];
          setdataCargo(cargo);
          setcampCargo(cargo.cargo);
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
  }, [cargoId]);

  function SendUpdate() {
    // Função para enviar os dados atualizados do cargo à API
    const url = baseUrl + "/update/" + cargoId;

    const data = { cargo: campCargo };

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
    // useEffect para redirecionar para a página de listar cargos após uma atualização bem-sucedida
    let timeout;

    if (alertType === "success") {
      timeout = setTimeout(() => {
        navigate("/dashboard/listar-cargos");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerEC m-5">
      <div className='dashboardTitulos mb-5'><h2>Editar cargo</h2></div>
      <div className="form-row justify-content-center">
      
        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputCargo" className="visually-hidden">Cargo na equipa</label>
          <input
            type="text"
            className="form-control"
            placeholder="Cargo"
            value={campCargo}
            onChange={event => setcampCargo(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-light btn-lg btn-block"
          onClick={SendUpdate}
        >
          Atualizar cargo na equipa
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