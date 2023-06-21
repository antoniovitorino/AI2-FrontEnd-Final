// Importação dos módulos e componentes necessários
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../auth-service";

 // Definição dos estados e do hook de navegação
export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Função que trata do evento de submissão do formulário
  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await AuthService.login(email, password);

      if (res === "" || res === false) {
        setMessage("Autenticação falhou.");
        setLoading(false);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage("Autenticação falhou.");
      setLoading(false);
    }
  };

  // Exportação do componente LoginComponent como padrão
  return (
    <section className="vh-100 bg-dark">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 text-light">
            <div className="d-flex align-items-center justify-content-center h-custom-2 px-5 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <h3 className="fw-normal mb-5 pb-3">Termos e Condições</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
O componente Main renderiza uma seção (<section>), que define a altura da secção como 100% da viewport e o fundo como escuro. 
Dentro desta secção, há uma estrutura de container-fluid para criar um layout responsivo.
O componente Main é exportado como padrão, permitindo que seja importado e utilizado noutros lugares da aplicação.
*/






