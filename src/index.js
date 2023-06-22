/*
Este código importa as bibliotecas React e ReactDOM, cria um elemento "root" para renderização e, 
de seguida, renderiza o componente "App" nesse "root". O "StrictMode" é uma ferramenta do React 
que ajuda a identificar potenciais problemas no código.
*/

// Importar as bibliotecas necessárias: React e ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Criar um "root" usando o método createRoot do ReactDOM
// O "root" é o ponto de entrada para a renderização do componente React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar o componente "App" dentro do "root"
// O componente é renderizado no modo "StrictMode" do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
