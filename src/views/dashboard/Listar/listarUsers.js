/*
O componente "ListarUsers" é responsável por exibir uma tabela com a lista de administradores. Usa o estado local (useState) 
para armazenar os dados dos administradores obtidos da API através da função "LoadUser", que é executada no momento da 
montagem do componente (hook useEffect). O componente também utiliza a biblioteca SweetAlert2 para exibir um alerta de 
confirmação antes de apagar um administrador.

A tabela é renderizada com os dados dos administradores e cada linha possui botões "Editar" e "Apagar". O botão "Editar" 
redireciona para a página de edição do administrador correspondente, enquanto o botão "Apagar" exibe um alerta de confirmação e, 
se confirmado, envia uma requisição para excluir o administrador da API. A função "LoadFillData" é responsável por preencher os 
dados na tabela, mapeando o array de administradores e gerando as linhas correspondentes.

O componente possui um link para a página de criação de um novo administrador e exibe uma mensagem adequada caso não haja 
administradores encontrados na lista.
*/

// Importações necessárias, incluindo bibliotecas, estilos, componentes e outras dependências
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import authHeader from '../../../auth-header';

const baseUrl = "https://jogatanas-api.onrender.com/users";

// Definição do componente funcional ListarUsers e inicialização do estado e uso do hook useEffect
export default function ListarUsers() {
  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    LoadUser(authHeader());
  }, []);

  // Função LoadUser para buscar a lista de administradores a partir da API utilizando axios e o token de autenticação
  function LoadUser(token) {
    axios.get(baseUrl + "/list", { headers: token })
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);  // Adicione esta linha para inspecionar os dados.
          const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
          setdataUser(sortedData);  // Utilize os dados ordenados.
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  // Função OnDelete para exibir um alerta de confirmação antes de apagar um administrador
  const OnDelete = (userId) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este registo',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apagar',
      cancelButtonText: 'Não, manter'
    }).then((result) => {
      if (result.value) {
        SendDelete(userId)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'O seu registo está seguro :)', 'error'
        )
      }
    })
  }

  // Função SendDelete para enviar a requisição de exclusão do administrador para a API utilizando axios e o token de autenticação
  const SendDelete = (userId) => {
    const url = baseUrl + "/delete";
    axios.post(url, { id: userId }, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Apagado',
            'O registo foi apagado', 'success'
          )
          LoadUser(authHeader());
        } else {
          alert("Error deleting user");
        }
      })
      .catch(error => {
        alert("Error deleting user: " + error);
      });
  }


  // Renderização da tabela com a lista de administradores
  return (
    <div className="containerLU m-5">
      <div className="d-flex justify-content-between">
        <div className='dashboardTitulos'><h2>Administradores</h2></div>
        <div>
          <Link to="/dashboard/criar-users" className="btn btn-light" tabIndex="1" role="button">
            Criar novo administrador
          </Link>
        </div>
      </div>
      <table className="table table-responsive table-striped table-dark text-bg-secondary my-5">
        <thead className="thead-dark text-bg-dark ">
          <tr>
            <th scope="col" style={{ width: '20%' }}>Nome</th>
            <th scope="col" style={{ width: '70%' }}>Email</th>
            <th colSpan="2" style={{ width: '10%' }}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.length > 0 ? (
            LoadFillData()
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Nenhum administrador encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // Função LoadFillData para preencher os dados na tabela, mapeando o array de administradores e gerar as linhas correspondentes
  function LoadFillData() {
    return dataUser.map((data, index) => {
      return (
        <tr key={index} className="align-middle">
          <td style={{ width: '20%' }}>{data.name}</td>
          <td style={{ width: '70%' }}>{data.email}</td>
          <td className="text-end" style={{ width: '5%' }}>
            <Link className="btn btn-light " to={"/dashboard/editar-users/" + data.id} > Editar </Link>
          </td>
          <td className="text-end" style={{ width: '5%' }}>
            <button className="btn btn-danger" onClick={() => OnDelete(data.id)}> Apagar </button>
          </td>
        </tr>
      )
    });
  }
}