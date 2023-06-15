import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../auth-service";


export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  return (
    <section className="vh-100 bg-dark">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 text-light">
            <div className="d-flex align-items-center justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
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
