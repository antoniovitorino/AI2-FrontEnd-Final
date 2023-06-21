import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authHeader from '../../../auth-header';

const baseUrl = "https://jogatanas-api.onrender.com/users";

export default function EditarUsers() {
  const navigate = useNavigate();
  const [dataUser, setdataUser] = useState("");
  const [campName, setcampName] = useState("");
  const [campEmail, setcampEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [alertType, setAlertType] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseUrl}/list/${userId}`;
        const response = await axios.get(url, { headers: authHeader() });
        const { success, data } = response.data;
        if (success) {
          const user = data;
          setdataUser(user);
          setcampName(user.name || "");
          setcampEmail(user.email || "");
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
  }, [userId]);

  function handleNameChange(event) {
    setcampName(event.target.value);
  }

  function handleEmailChange(event) {
    setcampEmail(event.target.value);
  }

  function SendUpdate() {
    const url = `${baseUrl}/update/${userId}`;

    const data = {
      name: campName,
      email: campEmail,
    };

    axios.put(url, data, {
      headers: {
        ...authHeader(),
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
        }
      })
      .catch(error => {
        setMessage("Error: " + error.message);
        setMessageType("danger");
      });
  }

  useEffect(() => {
    let timeout;

    if (alertType === "success") {
      timeout = setTimeout(() => {
        navigate("/dashboard/listar-users");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerEU m-5">
      <div className='dashboardTitulos mb-5'><h2>Editar administrador</h2></div>
      <div className="form-row justify-content-center">
      
        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputNome" className="visually-hidden">Nome</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={campName}
            onChange={handleNameChange}
          />
        </div>

        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputEmail" className="visually-hidden">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={campEmail}
            onChange={handleEmailChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-light btn-lg btn-block"
          onClick={SendUpdate}>Atualizar utilizador</button>
        {message && (
          <div className={`alert alert-${messageType} mt-5 col-md-6`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}


/*
Este código implementa o componente EditarUsers, que é responsável por editar as informações de um utilizador administrador. 
Busca os dados do administrador a ser editado por meio de uma solicitação HTTP GET para o endpoint correspondente. 
Os campos de entrada são preenchidos com os dados do administrador e pode atualizar as informações ao modificar 
os campos correspondentes. Ao enviar as atualizações, uma solicitação PUT é enviada para a API com os dados atualizados e um 
cabeçalho de autenticação contendo o token de autenticação. O servidor responde com uma mensagem indicando se a atualização 
foi bem-sucedida ou não. O componente também lida com o redirecionamento para a página de listagem de administradores após a 
atualização ser concluída. O cabeçalho de autenticação é obtido por meio da função authHeader() para adicionar o token de 
autenticação aos cabeçalhos das solicitações.
*/