/*
As bibliotecas Bootstrap e Axios são importadas.
O hook useState é utilizado para gerir o estado dos campos do formulário, a mensagem e o tipo de alerta.
A função CriarRegras é definida como um componente React.
Variáveis de estado são definidas utilizando o hook useState.
A função SendSave é responsável por enviar os dados do formulário para a API e salvar a regra.
A URL base para a chamada da API é definida.
O método POST do Axios é utilizado para enviar os dados para a API.
O token de autenticação é passado nos cabeçalhos da requisição utilizando o helper authHeader.
O estado message é atualizado com mensagens de sucesso ou erro retornadas pela API.
O estado alertType é atualizado com o tipo de alerta correspondente ao sucesso ou erro.
O estado é limpo e a página é redirecionada para a lista de regras após um período de tempo especificado, utilizando o hook useEffect.
A mensagem de sucesso ou erro é exibida dependendo do estado dos valores message e alertType.
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../../auth-header';

export default function CriarRegras() {
  const navigate = useNavigate();

  const [campRegra, setcampRegra] = useState('');
  const [campDescricao, setcampDescricao] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const SendSave = () => {
    const baseUrl = 'https://jogatanas-api.onrender.com/regras/create';

    axios
      .post(baseUrl, { 
        regra: campRegra, 
        descricao: campDescricao,
      }, {
        headers: authHeader()
      })
      .then(response => {
        if (response.data.success === true) {
          setMessage(response.data.message);
          setAlertType('success');

          setTimeout(() => {
            navigate('/dashboard/listar-regras');
          }, 2000);
        } else {
          setMessage(response.data.message);
          setAlertType('danger');
        }
      })
      .catch(error => {
        setMessage('Erro ao salvar a regra.');
        setAlertType('danger');
      });
  };

  useEffect(() => {
    let timeout;

    if (alertType === 'success') {
      timeout = setTimeout(() => {
        setMessage('');
        setAlertType('');
        navigate('/dashboard/listar-regras');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [alertType, navigate]);

  return (
    <div className="containerCR m-5">
      <div className="form-row justify-content-center">
      <div className='dashboardTitulos mb-3'><h2>Criar regra</h2></div>
        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputRegra" className="visually-hidden">
            Regra
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Regra"
            value={campRegra}
            onChange={event => setcampRegra(event.target.value)}
          />
        </div>
        <div className="form-group col-md-6 mb-4">
          <label htmlFor="inputDescricao" className="visually-hidden">
            Descrição
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Descricao"
            value={campDescricao}
            onChange={event => setcampDescricao(event.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-outline-light btn-lg btn-block"
        onClick={SendSave}
      >
        Gravar nova regra
      </button>
      {message && (
        <div className={`alert alert-${alertType} mt-5 col-md-6`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
}