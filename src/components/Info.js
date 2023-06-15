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
              <div className="mb-4"><h3>{pagina.info}</h3></div>
              <div>
                <Button style={{
                    borderRadius: 10,
                    backgroundColor: "#829893",
                    padding: "10px 18px",
                    fontSize: "18px"
                    }} variant="contained" endIcon={<Download />}>
                        {pagina.call_action}
                </Button>
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
