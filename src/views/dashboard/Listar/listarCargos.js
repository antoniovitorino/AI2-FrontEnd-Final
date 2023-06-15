import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function ListarCargos() {
  
  const [dataCargo, setdataCargo] = useState([]);
 
  useEffect(() => {
    LoadCargo();
  }, []);

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

  const SendDelete = cargoId => {
    const baseUrl = 'https://jogatanas-api.onrender.com/cargos/delete';
    axios.post(baseUrl, {
        id: cargoId
      })
      .then(response => {
        if (response.data.success) {
          
          Swal.fire('Apagado', 'O registo foi apagado', 'success');
          LoadCargo();
        }
      })
      .catch(error => {
        alert('Error 325'); 
      });
  }

  return (
    <div className="containerLC m-5">
      <div className="d-flex justify-content-start">
        <a href="/dashboard/criar-cargos" className="btn btn-light" tabIndex="1" role="button">
          Criar novo cargo
        </a>
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
