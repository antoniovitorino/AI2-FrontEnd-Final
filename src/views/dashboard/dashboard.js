import React from 'react';
import Top from '../../components/Top';
import Sidebar from '../../components/Sidebar';
import { Routes } from "react-router-dom";
import '../assets/style.css'

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

export default Dashboard;
