/*
Este código implementa o componente CriarCargos, responsável por criar um novo cargo na equipa.
O hook useState é utilizado para criar estados para campCargo, message e alertType.
O hook useEffect é utilizado para definir o comportamento após a renderização do componente.
O hook useNavigate é utilizado para obter a função de navegação para redirecionar após a criação do cargo.
A função SendSave é chamada quando o botão "Gravar novo cargo na equipa" é clicado. Realiza uma solicitação 
POST para o endpoint de criação de cargos, enviando o valor de campCargo como dados da requisição.
A resposta da solicitação é verificada para determinar se o cargo foi criado com sucesso ou não. Se for bem-sucedido, 
uma mensagem de sucesso é exibida e o redirecionamento para a página de listagem de cargos é agendado após 2 segundos.
Caso ocorra um erro na solicitação, uma mensagem de erro é exibida.
O hook useEffect é utilizado novamente para limpar a mensagem de sucesso e o tipo de alerta após o redirecionamento.
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CriarCargos() {
  const navigate = useNavigate(); 

  const [campCargo, setcampCargo] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const SendSave = () => {
    const baseUrl = 'https://jogatanas-api.onrender.com/cargos/create';

    axios
      .post(baseUrl, { cargo: campCargo })
      .then(response => {
        if (response.data.success === true) {
          setMessage(response.data.message);
          setAlertType('success');

          setTimeout(() => {
            navigate('/dashboard/listar-cargos');
          }, 2000);
        } else {
          setMessage(response.data.message);
          setAlertType('danger');
        }
      })
      .catch(error => {
        setMessage('Erro ao salvar o cargo.');
        setAlertType('danger');
      });
  };

  useEffect(() => {
    let timeout;

    if (alertType === 'success') {
      timeout = setTimeout(() => {
        setMessage('');
        setAlertType('');
        navigate('/dashboard/listar-cargos');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerCC m-5">
      <div className="form-row justify-content-center">
      <div className='dashboardTitulos mb-3'><h2>Criar Cargo</h2></div>
        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputCargo" className="visually-hidden">
            Cargo na equipa
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Cargo"
            value={campCargo}
            onChange={event => setcampCargo(event.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-outline-light btn-lg btn-block"
        onClick={SendSave}
      >
        Gravar novo cargo na equipa
      </button>
      {message && (
        <div className={`alert alert-${alertType} mt-5 col-md-6`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
}
