import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
 


export default function ListarRegras() {
  
  const [dataRegra, setdataRegra] = useState([]);
 
  useEffect(() => {
    LoadRegra();
  }, []);

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

  return (
    <div className="containerLR m-5">
      <div className="d-flex justify-content-between">
      <div className='dashboardTitulos mb-3'><h2>Regras</h2></div>
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
