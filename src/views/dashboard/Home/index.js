import React, { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import ListarUsers from '../Listar/listarUsers';
import ListarEquipas from '../Listar/listarEquipas';
import ListarCargos from '../Listar/listarCargos';
import ListarRegras from '../Listar/listarRegras';
import ListarCarousels from '../Listar/listarCarousels';
import CriarEquipas from "../Criar/criarEquipas";
import CriarCargos from "../Criar/criarCargos";
import CriarRegras from "../Criar/criarRegras";
import CriarUsers from "../Criar/criarUsers";
import CriarCarousels from "../Criar/criarCarousels";
import EditarEquipas from "../Editar/editarEquipas";
import EditarCargos from "../Editar/editarCargos";
import EditarRegras from "../Editar/editarRegras";
import EditarUsers from "../Editar/editarUsers";
import EditarPaginas from "../Editar/editarPagina";
import EditarCarousels from "../Editar/editarCarousels";
import { useNavigate } from "react-router-dom";
import AuthService from '../../../auth-service';
import Dashboard from '../dashboard';

function Home() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
        navigate('/login');
    } else {
        setCurrentUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    document.title = 'Dashboard - AfterEnd by Jogatanas';
  }, []);

  return (
    <Dashboard>  
      <Route path="/listar-users" element={<ListarUsers />} />
      <Route path="/listar-equipas" element={<ListarEquipas />} />
      <Route path="/listar-cargos" element={<ListarCargos />} />
      <Route path="/listar-regras" element={<ListarRegras />} />
      <Route path="/listar-carousels" element={<ListarCarousels />} />

      <Route path="/criar-equipas" element={<CriarEquipas />} />
      <Route path="/criar-cargos" element={<CriarCargos />} />
      <Route path="/criar-regras" element={<CriarRegras />} />
      <Route path="/criar-users" element={<CriarUsers />} />
      <Route path="/criar-carousels" element={<CriarCarousels />} />

      <Route path="/editar-cargos/:cargoId" element={<EditarCargos />} />
      <Route path="/editar-equipas/:equipaId" element={<EditarEquipas />} />
      <Route path="/editar-regras/:regraId" element={<EditarRegras />} />
      <Route path="/editar-users/:userId" element={<EditarUsers />} />
      <Route path="/editar-carousels/:carouselId" element={<EditarCarousels />} />
      <Route path="/" element={<EditarPaginas />} />
    </Dashboard>
  );
}

export { Home };
