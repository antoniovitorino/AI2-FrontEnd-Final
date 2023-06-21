// Importações necessárias, incluindo o componente Top, Sidebar, Routes do react-router-dom e um ficheiro CSS
import React from 'react';
import Top from '../../components/Top';
import Sidebar from '../../components/Sidebar';
import { Routes } from "react-router-dom";
import '../../assets/style.css';

// O componente Dashboard é definido como uma função que recebe uma prop chamada "children"
function Dashboard({ children }) {
  return (
    <>
      <Top />
      <div className="containerHome">
        <Sidebar />
        <div className="content">
          <Routes>
            {children}
          </Routes>
        </div>
      </div>
    </>
  );
}

// Exporta o componente Dashboard como padrão (default) para ser utilizado noutros módulos
export default Dashboard;

/*
O componente Dashboard representa a estrutura básica do dashboard.
Renderiza o componente Top, que contém os elementos como o cabeçalho do dashboard,
e o componente Sidebar, que representa o menu lateral com links para diferentes "páginas". 
O conteúdo principal do dashboard é renderizado dentro do componente Dashboard utilizando 
o elemento Routes do react-router-dom. A prop "children" é usada para renderizar o conteúdo específico 
de cada rota dentro do elemento Routes.
O componente Dashboard é responsável por definir a estrutura geral da página do dashboard, incluindo 
o cabeçalho, a barra lateral e o conteúdo específico de cada rota. Serve como um "layout" base 
para a aplicação do dashboard.
*/