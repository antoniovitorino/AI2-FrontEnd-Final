/*
O componente ListarCargos renderiza uma tabela que exibe a lista de cargos. Utiliza o estado local (useState) 
para armazenar os dados dos cargos obtidos da API através da função LoadCargo, que é executada no momento da 
montagem do componente (hook useEffect). O componente também usa a biblioteca SweetAlert2 para exibir um alerta de 
confirmação antes de apagar um cargo.

A tabela é exibida com os dados dos cargos e cada linha da tabela possui botões "Editar" e "Apagar". 
O botão "Editar" redireciona para a página de edição do cargo correspondente, enquanto o botão "Apagar" 
exibe um alerta de confirmação e, se confirmado, envia uma requisição para apagar o cargo da API. 
A função LoadFillData é responsável por preencher os dados na tabela, mapeando o array de cargos e gerando as 
linhas correspondentes.
O componente possui um link (botão) para a página de criação de um novo cargo e exibe uma mensagem caso não haja 
cargos encontrados na lista.
*/

// Importações necessárias, incluindo bibliotecas, estilos, componentes e outras dependências
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';

// Definição do componente funcional ListarCargos e inicialização do estado e uso do hook useEffect
export default function ListarCargos() {

  const [dataCargo, setdataCargo] = useState([]);

  useEffect(() => {
    LoadCargo();
  }, []);

  // Função LoadCargo para buscar a lista de cargos a partir da API utilizando axios
  function LoadCargo() {
    const url = 'https://jogatanas-api.onrender.com/cargos';
    axios.get(url).then(res => {
      if (res.data.success) {
        const data = res.data.data;

        const sortedData = data.sort((a, b) => a.cargo.localeCompare(b.cargo));

        setdataCargo(sortedData);
      } else {
        alert('Error Web Service!');
      }
    })
      .catch(error => {
        alert(error);
      });
  }


  // Função OnDelete para exibir um alerta de confirmação antes de apagar um cargo
  const OnDelete = id => {

    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Ao eliminar este cargo, vai eliminar todos as equipas associadas a este cargo.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apagar',
      cancelButtonText: 'Não, manter'
    }).then(result => {
      if (result.value) {
        SendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire('Cancelado', 'O seu registo está seguro :)', 'error');
      }
    });
  };


  // Função SendDelete para enviar a requisição de exclusão do cargo para a API utilizando axios
  const SendDelete = cargoId => {
    const baseUrl = `https://jogatanas-api.onrender.com/cargos/delete/${cargoId}`;
    axios.delete(baseUrl)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Apagado',
            'O registo foi apagado',
            'success'
          );
          LoadCargo();
        }
      })
      .catch(error => {
        alert('Error 325');
      });
  };
  


  // Renderização do componente ListarCargos, exibindo uma tabela com os cargos
  return (
    <div className="containerLC m-5">
      <div className="d-flex justify-content-between">
        <div className='dashboardTitulos '><h2>Cargos</h2></div>
        <div>
          <Link to="/dashboard/criar-cargos" className="btn btn-light" tabIndex="1" role="button">
            Criar novo cargo
          </Link>
        </div>
      </div>
      <table className="table table-responsive table-striped table-dark text-bg-secondary my-5">
        <thead className="thead-dark text-bg-dark ">
          <tr>
            <th scope="col" style={{ width: '90%' }}>Cargo</th>
            <th colSpan="2" style={{ width: '10%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dataCargo.length > 0 ? (
            LoadFillData()
          ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  Nenhum cargo encontrado.
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );

  // Função LoadFillData para preencher os dados na tabela, mapeando o array de cargos e gerar as linhas correspondentes
  function LoadFillData() {
    return dataCargo.map((data, index) => {
      return (
        <tr key={index} className="align-middle">
          <td style={{ width: '90%' }}>{data.cargo}</td>
          <td className="text-end" style={{ width: '5%' }}>
            <Link className="btn btn-light " to={"/dashboard/editar-cargos/" + data.id} > Editar </Link>
          </td>
          <td className="text-end" style={{ width: '5%' }}>
            <button className="btn btn-danger" onClick={() => OnDelete(data.id)}> Apagar </button>
          </td>
        </tr>
      );
    });
  }
}
