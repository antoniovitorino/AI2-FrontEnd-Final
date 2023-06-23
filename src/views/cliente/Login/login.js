/*
O componente Login renderiza a página de login. 
Importa os módulos e componentes necessários, como React, useEffect, NavbarOutras, Footer e Main.
Dentro do componente, há um efeito (useEffect) que define o título da página como "Login" ao montar o componente.
De seguida, os componentes NavbarOutras, Main e Footer são renderizados na ordem desejada.
O componente Login é exportado como padrão, permitindo que seja importado e utilizado noutros lugares da aplicação.
*/

// Importação dos módulos e componentes necessários
import React, { useEffect } from 'react';
import NavbarOutras from '../../../components/NavBarOutras';
import Footer from '../../../components/Footer';
import Main from './main';

// Effect que define o título da página como "Login"
export default function Login() {
    useEffect(()=>{
        document.title='Login';
    });


    // Exportação do componente Login como padrão
    return (  
        <>
            <NavbarOutras />
            <Main />
            <Footer />
        </>
    );
}
