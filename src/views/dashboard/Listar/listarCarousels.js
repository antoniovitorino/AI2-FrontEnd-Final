import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'; 
import { Link } from "react-router-dom"; 
import React ,{useEffect, useState} from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import authHeader from '../../../auth-header';

export default function ListarCarousels(){

    const [dataCarousel, setdataCarousel] = useState([]); 

    useEffect(() => {
        LoadCarousel(); },[]);  
     
        function LoadCarousel() {
            const url = "https://jogatanas-api.onrender.com/carousels"; 
            axios.get(url) 
            .then(res => {
                if(res.data.success){
                    const data = res.data.data; 
                    const sortedData = data.sort((a, b) => a.titulo.localeCompare(b.titulo));

                    setdataCarousel(sortedData); 
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
   
        const SendDelete = (carouselId) => { 
            const baseUrl = "https://jogatanas-api.onrender.com/carousels/delete" 
                axios.post(baseUrl,{
                    headers: authHeader(),
                    id:carouselId 
                })
            .then(response =>{
                if (response.data.success) {
                    Swal.fire(
                    'Apagado',
                    'O registo foi apagado', 'success'
                    )
                    LoadCarousel() 
                }
            })
                .catch ( error => {
                alert("Error 325 ") })
        }
    return (
        <div className="containerLE m-5">
        <div className="d-flex justify-content-start">
        <a href="/dashboard/criar-carousels" className="btn btn-light" tabIndex="1" role="button">
          Inserir novo slide
        </a>
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

    function LoadFillData(){
        return dataCarousel.map((data, index)=>{ 
            return(
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
