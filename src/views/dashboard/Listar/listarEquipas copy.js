import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'; 
import { Link } from "react-router-dom"; 
import React ,{useEffect, useState} from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import authHeader from '../../../auth-header';

export default function ListarEquipas(){

    const [dataEquipa, setdataEquipa] = useState([]); 

    useEffect(() => {
        LoadEquipa(); },[]);  
     
        function LoadEquipa() {
            const url = "http://localhost:4000/equipas"; 
            axios.get(url) 
            .then(res => {
                if(res.data.success){
                    const data = res.data.data; 
                    setdataEquipa(data); 
                }else{
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error) }); 
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
            const baseUrl = "http://localhost:4000/equipas/delete" 
                axios.post(baseUrl,{
                    headers: authHeader(),
                    id:userId 
                })
            .then(response =>{
                if (response.data.success) {
                    Swal.fire(
                    'Apagado',
                    'O registo foi apagado', 'success'
                    )
                    LoadEquipa() 
                }
            })
                .catch ( error => {
                alert("Error 325 ") })
        }
    return (
        <div className="containerLE m-5">
        <div className="d-flex justify-content-start">
        <a href="/dashboard/criar-equipas" className="btn btn-light" tabIndex="1" role="button">
          Inserir nova equipa
        </a>
        </div>
        <table className="table table-hover table-striped text-bg-secondary my-5">
            <thead className="thead-dark text-bg-dark "> 
                <tr>
                    <th scope="col">#</th> 
                    <th scope="col">Foto</th> 
                    <th scope="col">Nome</th>
                    <th scope="col">N.º aluno</th>
                    <th scope="col">Biografia</th>
                    <th scope="col">Cargo</th>
                    <th colSpan="2">Ações</th>
                </tr> 
            </thead> 
            <tbody>
                {dataEquipa.length > 0 ? (
                    LoadFillData()
                    ) : (
                    <tr>
                        <td colSpan="2" className="text-center">
                         Nenhuma equipa encontrada.
                        </td>
                    </tr>
                    )
                }
            </tbody>
        </table>
        </div>
    );

    function LoadFillData(){
        return dataEquipa.map((data, index)=>{ 
            return(
                <tr key={index} className="align-middle"> 
                    <th>{data.id}</th> 
                    <td><img src={`http://localhost:4000/midia/${data.fotoId}`} alt={data.nome} width="50"/></td>
                    <td>{data.nome}</td>
                    <td>{data.numero_aluno}</td>
                    <td>{data.biografia}</td>
                    <td>{data.cargo.cargo}</td>  
                    <td>
                        <Link className="btn btn-light " to={"/dashboard/editar-equipas/"+data.id} > Editar </Link>
                    </td> 
                    <td>
                        <button className="btn btn-danger" onClick={()=>OnDelete(data.id)}> Apagar </button>
                    </td> 
                </tr>
            ) 
        });
    }
}
