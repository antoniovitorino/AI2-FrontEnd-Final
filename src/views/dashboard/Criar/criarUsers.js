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
      const baseUrl = "https://jogatanas-api.onrender.com/users/register";

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
          <div className='dashboardTitulos mb-3'><h2>Criar administrador</h2></div>
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

/*
As bibliotecas Bootstrap e Axios são importadas.
Os hooks useState e useEffect são utilizados para gerir o estado e os efeitos colaterais.
O componente CriarUsers é definido como um componente React.
Variáveis de estado são definidas utilizando o hook useState.
São definidas expressões regulares (regex) para validação de email e password.
A função SendSave é responsável por verificar os campos preenchidos e fazer a chamada à API para criar um novo administrador.
São realizadas validações para garantir que todos os campos sejam preenchidos corretamente.
O envio dos dados é feito utilizando o método POST do Axios e o cabeçalho de autenticação (authHeader()).
O estado message é atualizado com mensagens de sucesso ou erro retornadas pela API.
O estado alertType é atualizado com o tipo de alerta correspondente ao sucesso ou erro.
O estado é limpo e a página é redirecionada para a lista de usuários após um período de tempo especificado, utilizando o hook useEffect.
*/
