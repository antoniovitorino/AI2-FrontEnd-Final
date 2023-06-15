import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import authHeader from '../../../auth-header';

const baseUrl = "http://localhost:4000/users";

export default function ListarUsers() {
  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    LoadUser(authHeader());
  }, []);

  function LoadUser(token) {
    axios.get(baseUrl + "/list", { headers: token })
    .then(res => {
      if (res.data.success) {
        const data = res.data.data;
        console.log(data);  // Add this line to inspect the data.
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setdataUser(sortedData);  // Use sorted data.
      } else {
        alert("Error Web Service!");
      }
    })
    .catch(error => {
      alert(error);
    });
  }

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

  return (
    <div className="containerLU m-5">
      <div className="d-flex justify-content-start">
        <a href="/dashboard/criar-users" className="btn btn-light" tabIndex="1" role="button">
          Criar novo administrador
        </a>
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
