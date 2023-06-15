import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import authHeader from '../../../auth-header';

export default function ListarEquipas() {

  const [dataEquipa, setdataEquipa] = useState([]);

  useEffect(() => {
    LoadEquipa();
  }, []);

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

  return (
    <div className="containerLE m-5">
      <div className="d-flex justify-content-between">
        <div className='dashboardTitulos mb-5'><h2>Equipas</h2></div>
        <div>
        <Link to="/dashboard/criar-equipas" className="btn btn-light" tabIndex="1" role="button">
          Inserir nova equipa
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
