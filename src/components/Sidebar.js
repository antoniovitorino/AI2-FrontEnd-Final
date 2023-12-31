/*
O componente Sidebar é definido como uma função React.
Utiliza o hook useLocation do React Router para obter a localização atual da página.
A função isActive é usada para verificar se um determinado caminho está ativo com base na localização atual.
O retorno do componente é uma estrutura de layout de barra lateral.
Existem dois menus: "Página" e "Administradores".
No menu "Página", são renderizados os links para diferentes páginas do dashboard: "Página", "Carousel", "Regras", "Cargos" e "Equipas".
Cada link é envolvido num componente Link do React Router para permitir a navegação.
O estilo de fundo do link é definido com base na função isActive, que verifica se o caminho está ativo.
No menu "Administradores", é renderizado o link para a página de listagem de utilizadores com privilégios de administrador.
O componente Sidebar é exportado como o componente padrão.
*/

import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/style.css";

import {
    Web,
    VerifiedUser,
    DynamicForm,
    Group,
    Work,
    ViewCarousel,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const isActive = (path) => {
        if (path === "/dashboard") {
            return location.pathname === path;
        }
        if (location.pathname === path) {
            return true;
        }
        if (location.pathname.startsWith(path + '/')) {
            return true;
        }
        const editingPath = path.replace("listar-", "editar-");
        const creatingPath = path.replace("listar-", "criar-");
        if (location.pathname.startsWith(editingPath) || location.pathname.startsWith(creatingPath)) {
            return true;
        }
        return false;
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Página</h3>
                    <ul className="sidebarList">
                    <Link to="/dashboard" className={`link ${isActive("/dashboard") && "active"}`}>
                        <li className="sidebarListItem" style={{backgroundColor: isActive("/dashboard") ? '#829893' : 'transparent' }}>
                        <Web className="sidebarIcon" />
                        Página
                        </li>
                        </Link>
                        <Link to="/dashboard/listar-carousels" className={`link ${isActive("/dashboard/listar-carousels") && "active"}`}>
                        <li className="sidebarListItem" style={{backgroundColor: isActive("/dashboard/listar-carousels") ? '#829893' : 'transparent' }}>
                        <ViewCarousel className="sidebarIcon" />
                        Carousel
                        </li>
                        </Link>
                        <Link to="/dashboard/listar-regras" className={`link ${isActive("/dashboard/listar-regras") && "active"}`}>
                        <li className="sidebarListItem" style={{backgroundColor: isActive("/dashboard/listar-regras") ? '#829893' : 'transparent' }}>
                        <DynamicForm className="sidebarIcon" />
                        Regras
                        </li>
                        </Link>
                        <Link to="/dashboard/listar-cargos" className={`link ${isActive("/dashboard/listar-cargos") && "active"}`}>
                        <li className="sidebarListItem" style={{backgroundColor: isActive("/dashboard/listar-cargos") ? '#829893' : 'transparent' }}>
                        <Work className="sidebarIcon" />
                        Cargos
                        </li>
                        </Link>
                        <Link to="/dashboard/listar-equipas" className={`link ${isActive("/dashboard/listar-equipas") && "active"}`}>
                        <li className="sidebarListItem" style={{backgroundColor: isActive("/dashboard/listar-equipas") ? '#829893' : 'transparent' }}>
                        <Group className="sidebarIcon" />
                        Equipas
                        </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Administradores</h3>
                    <ul className="sidebarList">
                    <Link to="/dashboard/listar-users" className={`link ${isActive("/dashboard/listar-users") && "active"}`}>
                        <li className="sidebarListItem" style={{backgroundColor: isActive("/dashboard/listar-users") ? '#829893' : 'transparent' }}>
                                <VerifiedUser className="sidebarIcon" />
                                Credênciais
                            </li>
                        </Link> 
                    </ul>
                </div>
            </div>
        </div>
    );
}
