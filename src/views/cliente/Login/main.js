/*
O componente LoginComponent é responsável por renderizar o formulário de login. Utiliza os estados para controlar 
os valores dos campos email, password, loading e message, e utiliza o hook useNavigate do react-router-dom para 
realizar a navegação para a página de dashboard após o login.
A função handleLogin é responsável por tratar o evento de submissão do formulário. Realiza a chamada ao serviço de 
autenticação AuthService.login passando o email e a password fornecidos pelo utilizador. Caso a autenticação seja 
bem-sucedida, a função vai para a página de dashboard. Caso contrário, exibe uma mensagem de erro.
O componente retorna a estrutura do formulário de login dentro de uma seção (<section>), que define a altura da secção
como 100% da viewport e o fundo como escuro. Dentro desta estrutura, são renderizados os campos de email e password, 
um botão de submissão e uma mensagem de erro caso ocorra algum problema durante a autenticação.
O componente LoginComponent é exportado como padrão, permitindo que seja importado e utilizado noutros lugares da aplicação.
*/

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
              <form style={{ width: "20rem" }} onSubmit={handleLogin}>
                <h3 className="fw-normal mb-5 pb-3">Login</h3>
                <div className="form-outline mb-4">
                  <label htmlFor="email" className="visually-hidden">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="password" className="visually-hidden">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-1 mb-5">
                  <button
                    className="btn btn-outline-light btn-lg btn-block"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "A ir para o dashboard" : "Entrar"}
                  </button>
                </div>
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
