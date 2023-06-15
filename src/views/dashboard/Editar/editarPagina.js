import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";

const baseUrl = "http://localhost:4000/paginas";

export default function EditarPaginas() {
  const [dataPagina, setdataPagina] = useState("");
  const [campPagina, setcampPagina] = useState("");
  const [campCallAction, setcampCallAction] = useState("");
  const [campInfo, setcampInfo] = useState("");
  const [campVideo, setcampVideo] = useState("");
  const [campSobre, setcampSobre] = useState("");

  const [message, setMessage] = useState({success: null, text: ""});

  useEffect(() => {
    const url = baseUrl + "/1";
    axios.get(url)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data && res.data.data.length > 0) {
            const data = res.data.data[0];
            setdataPagina(data);
            setcampPagina(data.pagina);
            setcampCallAction(data.call_action);
            setcampInfo(data.info);
            setcampVideo(data.video);
            setcampSobre(data.sobre);
          } else {
            axios.post(baseUrl, {
  pagina: "Pagina default",
  call_action: "Call action default",
  info: "Info default",
  video: "Video default",
  sobre: "Sobre default",
}).then(res => {
  if (res.data.success) {
    const data = res.data.data;
    setdataPagina(data);
    setcampPagina(data.pagina);
    setcampCallAction(data.call_action);
    setcampInfo(data.info);
    setcampVideo(data.video);
    setcampSobre(data.sobre);
  }
  console.log(res.data);
}).catch(error => {
  console.log(error);
});
          }
        } else {
          alert("Error web service");
        }
      })
      .catch(error => {
        alert("Error server: " + error);
      });
  }, []);


  function SendUpdate(event) {
    event.preventDefault();

    const url = baseUrl + "/update/1";
       const data = {
        pagina: campPagina,
        call_action: campCallAction,
        info: campInfo,
        video: campVideo,
        sobre: campSobre
    };
    
    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

      .then(response => {
        if (response.data.success === true) {
          showMessage(true, response.data.message);
        } else {
          showMessage(false, "Error");
        }
      })
      .catch(error => {
        showMessage(false, "Error: " + error);
      });
    
  }

  function showMessage(success, text) {
    setMessage({ success, text });
  
    // Apaga a mensagem depois de 2 segundos
    setTimeout(() => {
      setMessage({ success: null, text: "" });
    }, 2000);
  }

  return (
    <div className="containerEP m-5">
      <div className="row">
        <div className="col-md-6">
        <form onSubmit={SendUpdate}>
          <div className="form-row justify-content-center">
          
            <div className="form-group mb-4">
            
              <label htmlFor="inputPagina" className="visually-hidden">Pagina</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pagina"
                value={campPagina}
                onChange={event => setcampPagina(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputCallAction" className="visually-hidden">Call Action</label>
              <input
                type="text"
                className="form-control"
                placeholder="Call Action"
                value={campCallAction}
                onChange={event => setcampCallAction(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputInfo" className="visually-hidden">Info</label>
              <input
                type="text"
                className="form-control"
                placeholder="Info"
                value={campInfo}
                onChange={event => setcampInfo(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputVideo" className="visually-hidden">Video</label>
              <input
                type="text"
                className="form-control"
                placeholder="Video"
                value={campVideo}
                onChange={event => setcampVideo(event.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputSobre" className="visually-hidden">Sobre</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Sobre"
                value={campSobre}
                onChange={event => setcampSobre(event.target.value)}
              />
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-outline-light btn-lg btn-block"
            >Atualizar página</button>
            </form>
          {message.text && (
            <div
              className={`alert mt-5 ${message.success ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}