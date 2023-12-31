/*
O componente ListarCarousels renderiza uma tabela que exibe a lista de carousels (slides). 
Utiliza o estado local (useState) para armazenar os dados dos carousels obtidos da 
API através da função LoadCarousel, que é executada no momento da montagem do componente 
(hook useEffect). O componente também usa a biblioteca SweetAlert2 para exibir um alerta de 
confirmação antes de apagar um carousel.

A tabela é exibida com os dados dos carousels e cada linha da tabela possui botões "Editar" 
e "Apagar". O botão "Editar" redireciona para a página de edição do carousel correspondente, 
enquanto o botão "Apagar" exibe um alerta de confirmação e, se confirmado, envia uma requisição 
para apagar o carousel da API. A função LoadFillData é responsável por preencher os dados na 
tabela, mapeando o array de carousels e gerando as linhas correspondentes.

Além disso, o componente possui um link (botão) para a página de criação de um novo carousel e exibe 
uma mensagem caso não haja carousels encontrados na lista. O componente utiliza a 
função authHeader para incluir o cabeçalho de autenticação nas requisições feitas pela função 
SendDelete.
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

// Definição do componente funcional ListarCarousels e inicialização do estado e uso do hook useEffect
export default function ListarCarousels() {

    const [dataCarousel, setdataCarousel] = useState([]);

    useEffect(() => {
        LoadCarousel();
    }, []);

    // Função LoadCarousel para buscar a lista de carousels a partir de uma API utilizando axios
    function LoadCarousel() {
        const url = "https://jogatanas-api.onrender.com/carousels";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    const sortedData = data.sort((a, b) => a.titulo.localeCompare(b.titulo));

                    setdataCarousel(sortedData);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    };

    // Função OnDelete para exibir um alerta de confirmação antes de apagar um carousel
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


    // Função SendDelete para enviar a requisição de exclusão do carousel para a API utilizando axios e o cabeçalho de autenticação
    const SendDelete = (carouselId) => {
        const baseUrl = `https://jogatanas-api.onrender.com/carousels/delete/${carouselId}`;
        axios.delete(baseUrl, { headers: authHeader() })
          .then(response => {
            if (response.data.success) {
              Swal.fire(
                'Apagado',
                'O registo foi apagado',
                'success'
              );
              LoadCarousel();
            }
          })
          .catch(error => {
            alert('Error 325');
          });
      };
      
  // Renderização do componente ListarCarousels, exibindo uma tabela com os slides
    return (
        <div className="containerLE m-5">
            <div className="d-flex justify-content-between">
                <div className='dashboardTitulos'><h2>Slides</h2></div>
                <div>
                    <Link to="/dashboard/criar-carousels" className="btn btn-light" tabIndex="1" role="button">
                        Inserir novo slide
                    </Link>
                </div>
            </div>
            <table className="table table-responsive table-striped table-dark text-bg-secondary my-5">
                <thead className="thead-dark text-bg-dark ">
                    <tr>
                        <th scope="col" style={{ width: '20%' }}>Slide</th>
                        <th scope="col" style={{ width: '20%' }}>Título</th>
                        <th scope="col" style={{ width: '50%' }}>Descrição</th>
                        <th colSpan="2" style={{ width: '10%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCarousel.length > 0 ? (
                        LoadFillData()
                    ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum slide encontrado.
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );

    function LoadFillData() {
        return dataCarousel.map((data, index) => {
            return (
                <tr key={index} className="align-middle">
                    <td style={{ width: '20%' }}><img className="imagemCarousel" src={`https://jogatanas-api.onrender.com/midia/${data.fotoId}`} alt={data.titulo} /></td>
                    <td style={{ width: '20%' }}>{data.titulo}</td>
                    <td style={{ width: '50%' }}>{data.descricao}</td>
                    <td className="text-end" style={{ width: '5%' }}>
                        <Link className="btn btn-light " to={"/dashboard/editar-carousels/" + data.id} > Editar </Link>
                    </td>
                    <td className="text-end" style={{ width: '5%' }}>
                        <button className="btn btn-danger" onClick={() => OnDelete(data.id)}> Apagar </button>
                    </td>
                </tr>
            )
        });
    }
}
