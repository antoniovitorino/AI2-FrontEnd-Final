/*
Este código é um componente React chamado Home que representa a página inicial da aplicação. 
O componente é importado e usado noutros lugares do código. O objetivo principal desta página 
inicial é exibir um dashboard com várias rotas para listar, criar e editar utilizadores, equipas, 
cargos, regras, carousels e páginas.
O componente faz uso de vários hooks do React, como useEffect e useState. O useEffect é utilizado 
para executar efeitos colaterais em determinados momentos, como quando o componente é montado e 
quando o título da página é alterado. O useState é usado para criar um estado local que armazena 
o utilizador atual.
Dentro do useEffect, o componente verifica se existe um utilizador atual. Se não houver, o utilizador 
é redirecionado para a página de login por meio do hook useNavigate. Caso contrário, o utilizador 
atual é definido no estado do componente.
A função setCurrentUser é chamada com o utilizador atual retornado pelo serviço de autenticação 
AuthService.getCurrentUser(). O serviço AuthService lida com a autenticação e autorização 
na aplicação.
O componente retorna um elemento <Dashboard> que envolve várias rotas. Cada rota é definida com a 
sintaxe <Route path="/caminho" element={<Componente />} />. Cada rota possui um caminho de URL e um 
componente que será renderizado quando o caminho corresponder à rota atual.
Por exemplo, a rota <Route path="/listar-users" element={<ListarUsers />} /> renderizará o componente 
ListarUsers quando o caminho da URL corresponder a "/listar-users". Isto repete-se para todas as outras 
rotas definidas no código.
*/

// Importações
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
  const navigate = useNavigate(); // Hook do React Router utilizado para navegar entre as rotas
  const [currentUser, setCurrentUser] = useState(null); // Estado para guardar o utilizador atual

  useEffect(() => {
    const user = AuthService.getCurrentUser(); // Obtém o utilizador atual através do serviço de autenticação
    if (!user) {
        navigate('/login'); // Se não houver utilizador, redireciona para a página de login
    } else {
        setCurrentUser(user); // Caso contrário, define o utilizador atual no estado
    }
  }, [navigate]);

  useEffect(() => {
    document.title = 'Dashboard - AfterEnd by Jogatanas'; // Define o título da página
  }, []);

  // Rotas
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