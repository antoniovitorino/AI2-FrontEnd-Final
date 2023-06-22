/*
O componente ListarEquipas renderiza uma tabela que exibe a lista de equipas. Utiliza o estado local (useState) 
para armazenar os dados das equipas obtidos da API através da função LoadEquipa, que é executada no momento da 
montagem do componente (hook useEffect). O componente também usa a biblioteca SweetAlert2 para exibir um alerta de 
confirmação antes de apagar uma equipa.

A tabela é exibida com os dados das equipas e cada linha da tabela possui botões "Editar" e "Apagar". O botão 
"Editar" redireciona para a página de edição da equipa correspondente, enquanto o botão "Apagar" exibe um alerta 
de confirmação e, se confirmado, envia uma requisição para apagar a equipa da API. A função LoadFillData é responsável
por preencher os dados na tabela, mapeando o array de equipas e gerando as linhas correspondentes.

O componente possui um link para a página de criação de uma nova equipa e exibe uma mensagem caso não haja equipas 
encontradas na lista. O componente utiliza a função authHeader para incluir o cabeçalho de autenticação nas 
requisições feitas pela função SendDelete.
*/

// Importações necessárias, incluindo bibliotecas, estilos, componentes e outras dependências
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import authHeader from '../../../auth-header';

// Definição do componente funcional ListarEquipas e inicialização do estado e uso do hook useEffect
export default function ListarEquipas() {

  const [dataEquipa, setdataEquipa] = useState([]);

  useEffect(() => {
    LoadEquipa();
  }, []);

  // Função LoadEquipa para buscar a lista de equipas a partir da API utilizando axios
  function LoadEquipa() {
    const url = "https://jogatanas-api.onrender.com/equipas";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          // Ordenar os valores por ordem ascendente pelo campo "nome"
          const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
          setdataEquipa(sortedData);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error)
      });
  };

  // Função OnDelete para exibir um alerta de confirmação antes de apagar uma equipa
  const OnDelete = (id) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este registo',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apagar',
      cancelButtonText: 'Não, manter'
    }).then((result) => {
      if (result.value) {
        SendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'O seu registo está seguro :)', 'error'
        )
      }
    })
  }


  // Função SendDelete para enviar a requisição de exclusão da equipa para a API utilizando axios e o cabeçalho de autenticação
  const SendDelete = (userId) => {
    const baseUrl = "https://jogatanas-api.onrender.com/equipas/delete"
    axios.post(baseUrl, {
      headers: authHeader(),
      id: userId
    })
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Apagado',
            'O registo foi apagado', 'success'
          )
          LoadEquipa()
        }
      })
      .catch(error => {
        alert("Error 325 ")
      })
  }


  // Renderização do componente ListarEquipas, exibindo uma tabela com as equipas
  return (
    <div className="containerLE m-5">
      <div className="d-flex justify-content-between">
        <div className='dashboardTitulos'><h2>Equipas</h2></div>
        <div>
          <Link to="/dashboard/criar-equipas" className="btn btn-light" tabIndex="1" role="button">
            Inserir novo membro
          </Link>
        </div>
      </div>
      <table className="table table-responsive table-striped table-dark text-bg-secondary my-5">
        <thead className="thead-dark text-bg-dark ">
          <tr>
            <th scope="col" style={{ width: '10%' }}>Foto</th>
            <th scope="col" style={{ width: '20%' }}>Nome</th>
            <th scope="col" style={{ width: '10%' }}>N.º aluno</th>
            <th scope="col" style={{ width: '15%' }}>Cargo</th>
            <th scope="col" style={{ width: '35%' }}>Biografia</th>
            <th colSpan="2" style={{ width: '10%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dataEquipa.length > 0 ? (
            LoadFillData()
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhuma equipa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // Função LoadFillData para preencher os dados na tabela, mapeando o array de equipas e gerar as linhas correspondentes
  function LoadFillData() {
    return dataEquipa.map((data, index) => {
      return (
        <tr key={index} className="align-middle">
          <td style={{ width: '10%' }}><img className="imagemEquipa" src={`https://jogatanas-api.onrender.com/midia/${data.fotoId}`} alt={data.nome} /></td>
          <td style={{ width: '20%' }}>{data.nome}</td>
          <td style={{ width: '10%' }}>{data.numero_aluno}</td>
          <td style={{ width: '15%' }}>{data.cargo.cargo}</td>
          <td style={{ width: '35%' }}>{data.biografia}</td>
          <td className="text-end" style={{ width: '5%' }}>
            <Link className="btn btn-light " to={"/dashboard/editar-equipas/" + data.id} > Editar </Link>
          </td>
          <td className="text-end" style={{ width: '5%' }}>
            <button className="btn btn-danger" onClick={() => OnDelete(data.id)}> Apagar </button>
          </td>
        </tr>
      )
    });
  }
}
