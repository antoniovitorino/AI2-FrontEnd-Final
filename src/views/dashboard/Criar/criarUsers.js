import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import authHeader from '../../../auth-header';

export default function CriarUsers() {
  const navigate = useNavigate();
  const [campUser, setcampUser] = useState("");
  const [campEmail, setcampEmail] = useState("");
  const [campPassword, setcampPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const SendSave = () => {
    if (campUser === "") {
      setMessage("Inserir nome!");
      setAlertType("danger");
    } else if (!emailRegex.test(campEmail)) {
      setMessage("Inserir um email válido!");
      setAlertType("danger");
    } else if (!passwordRegex.test(campPassword)) {
      setMessage("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, letras minúsculas e números!");
      setAlertType("danger");
    } else {
      const baseUrl = "http://localhost:4000/users/register";

      axios
        .post(baseUrl, {
          name: campUser,
          email: campEmail,
          password: campPassword,
        }, {
          headers: authHeader()
        })
        .then(response => {
          if (response.data.success === true) {
            setMessage(response.data.message);
            setAlertType("success");
          } else {
            setMessage(response.data.message);
            setAlertType("danger");
          }
        })
        .catch(error => {
          setMessage("Erro ao salvar utilizador.");
          setAlertType("danger");
        });
    }
  };

  useEffect(() => {
    let timeout;

    // Limpa a mensagem após 2 segundos
    if (alertType === 'success') {
      timeout = setTimeout(() => {
        setMessage('');
        setAlertType('');
        navigate('/dashboard/listar-users');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerCU m-5">
      <div className="row">
        <div className="col-md-6">
          <div className="form-row justify-content-center">
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputUser" className="visually-hidden">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="User"
                value={campUser}
                onChange={event => setcampUser(event.target.value)}
              />
            </div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputEmail" className="visually-hidden">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={campEmail}
                onChange={event => setcampEmail(event.target.value)}
              />
            </div>
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="inputPassword" className="visually-hidden">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={campPassword}
                onChange={event => setcampPassword(event.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-light btn-lg btn-block"
            onClick={SendSave}
          >
            Gravar novo utilizador
          </button>
          {message && (
            <div className={`alert alert-${alertType} mt-5`} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}