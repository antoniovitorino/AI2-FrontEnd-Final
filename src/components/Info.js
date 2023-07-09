/*
O componente Info é definido como um componente React.
O componente Download é importado do @mui/icons-material para exibir o ícone de download.
O componente Button é importado do @mui/material para renderizar o botão com estilo do Material-UI.
O estado paginas é definido usando o hook useState para armazenar os dados da página.
O hook useEffect é usado para buscar os dados da página da API quando o componente é montado.
A função fetchPaginas é uma função assíncrona que usa o axios para fazer uma requisição GET para a API e 
atualizar o estado paginas com os dados recebidos.
Os dados da página são exibidos usando o método map.
O vídeo da página é exibido num elemento iframe.
O componente Info é exportado como o componente padrão.
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import Download from '@mui/icons-material/Download';
import Button from '@mui/material/Button';


const Info = () => {

  const [paginas, setPaginas] = useState([]);

  useEffect(() => {
    const fetchPaginas = async () => {
      try {
        const response = await axios.get('https://jogatanas-api.onrender.com/paginas/1');
        const data = response.data.data;
        setPaginas(shuffle(data));
      } catch (error) {
        console.log('Error fetching paginas:', error);
      }
    };
  
    fetchPaginas();
  }, []);

  return (
    <div className="container-fluid px-5 py-3 sobre">
      {paginas.map(pagina => (
        <div className="text-start text-light mb-5" key={pagina.id}>
          <h1 className="mb-5">{pagina.pagina}</h1>
          <div className='row'>
            <div className="col-12 col-md-6 mb-5">    
              <div className="mb-5">{pagina.sobre}</div>
              <div className="mb-4"><h4>{pagina.info}</h4></div>
              <div>
              <a href="/downloads/afterend.zip" download>
                <Button style={{
                    borderRadius: 10,
                    backgroundColor: "#829893",
                    padding: "10px 18px",
                    fontSize: "18px"
                    }} variant="contained" endIcon={<Download />}>
                        {pagina.call_action}
                </Button>
                </a>
            </div>
            </div>
            <div className="col-12 col-md-6 mb-5" style={{ position: 'relative', minHeight: '500px' }}>
              <iframe 
                className="embed-responsive-item" 
                src={pagina.video} 
                allowFullScreen 
                title="Video"
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Info;
