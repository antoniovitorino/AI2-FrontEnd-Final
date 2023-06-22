/*
O componente ListarRegras renderiza uma tabela que exibe a lista de regras. Utiliza o estado local (useState) 
para armazenar os dados das regras obtidos da API através da função LoadRegra, que é executada no momento da 
montagem do componente (hook useEffect). O componente também usa a biblioteca SweetAlert2 para exibir um alerta de 
confirmação antes de apagar uma regra.

A tabela é exibida com os dados das regras e cada linha da tabela possui botões "Editar" e "Apagar". O botão "Editar" 
redireciona para a página de edição da regra correspondente, enquanto o botão "Apagar" exibe um alerta de confirmação e,
se confirmado, envia uma requisição para apagar a regra da API. A função LoadFillData é responsável por preencher os 
dados na tabela, mapeando o array de regras e gerando as linhas correspondentes.

O componente possui um link para a página de criação de uma nova regra e exibe uma mensagem adequada caso não haja 
regras encontradas na lista.
*/

// Importações necessárias, incluindo bibliotecas, estilos, componentes e outras dependências
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';

// Definição do componente funcional ListarRegras e inicialização do estado e uso do hook useEffect
export default function ListarRegras() {
  
  const [dataRegra, setdataRegra] = useState([]);
 
  useEffect(() => {
    LoadRegra();
  }, []);

  // Função LoadRegra para buscar a lista de regras a partir da API utilizando axios
  function LoadRegra() {
    const url = 'https://jogatanas-api.onrender.com/regras';
    axios.get(url).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          const sortedData = data.sort((a, b) => a.regra.localeCompare(b.regra));
 
          setdataRegra(sortedData); 
        } else {
          alert('Error Web Service!'); 
        }
      })
      .catch(error => {
        alert(error); 
      });
  }

  // Função OnDelete para exibir um alerta de confirmação antes de apagar uma regra
  const OnDelete = id => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este registo',
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


  // Função SendDelete para enviar a requisição de exclusão da regra para a API utilizando axios
  const SendDelete = regraId => {
    const baseUrl = 'https://jogatanas-api.onrender.com/regras/delete';
    axios.post(baseUrl, {
        id: regraId
      })
      .then(response => {
        if (response.data.success) {
          Swal.fire('Apagado', 'O registo foi apagado', 'success');
          LoadRegra();
        }
      })
      .catch(error => {
        alert('Error 325'); 
      });
  }

  // Renderização do componente ListarRegras, exibindo uma tabela com as regras
  return (
    <div className="containerLR m-5">
      <div className="d-flex justify-content-between">
        <div className='dashboardTitulos'><h2>Regras</h2></div>
        <div>
          <Link to="/dashboard/criar-regras" className="btn btn-light" tabIndex="1" role="button">
            Inserir nova regra
          </Link>
        </div>
      </div>
      <table className="table table-responsive table-striped table-dark text-bg-secondary my-5">
        <thead className="thead-dark text-bg-dark ">
          <tr>
            <th scope="col" style={{ width: '20%' }}>Regra</th>
            <th scope="col" style={{ width: '70%' }}>Descrição</th>
            <th colSpan="2" style={{ width: '10%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dataRegra.length > 0 ? (
            LoadFillData()
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Nenhuma regra encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
 
  // Função LoadFillData para preencher os dados na tabela, mapeando o array de regras e gerar as linhas correspondentes
  function LoadFillData() {
    return dataRegra.map((data, index) => {
      return (
        <tr key={index} className="align-middle">
          <td style={{ width: '20%' }}>{data.regra}</td>
          <td style={{ width: '70%' }}>{data.descricao}</td>
          <td className="text-end" style={{ width: '5%' }}>
            <Link className="btn btn-light " to={"/dashboard/editar-regras/" + data.id} > Editar </Link>
          </td>
          <td className="text-end" style={{ width: '5%' }}>
            <button className="btn btn-danger" onClick={() => OnDelete(data.id)}> Apagar </button>
          </td>
        </tr>
      );
    });
  }
}
