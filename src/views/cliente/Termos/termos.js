/*
O componente Termos renderiza a página de termos. 
Importa os módulos e componentes necessários, como React, useEffect, Navbar, Footer e Main.
Dentro do componente, há um efeito (useEffect) que define o título da página como "Termos e Condições" ao montar o componente.
De seguida, os componentes Navbar, Main e Footer são renderizados na ordem desejada.
O componente Termos é exportado como padrão, permitindo que seja importado e utilizado noutros lugares da aplicação.
*/

// Importação dos módulos e componentes necessários
import React, {useEffect} from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Main from './main';

// Effect que define o título da página como "Termos e Condições"
export default function Termos() {
    useEffect(()=>{
        document.title='Termos e Condições'
    })

    // Exportação do componente Login como padrão
    return (  
        <>
            <Navbar />
            <Main />
            <Footer />
        </>
    );
}