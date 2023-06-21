// Importação dos módulos e componentes necessários
import React, { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Equipa from '../../../components/Equipa';
import Footer from '../../../components/Footer';
import Carousel from '../../../components/Carousel';
import Regras from '../../../components/Regras';
import Info from '../../../components/Info';


// Effect que define o título da página como "AfterEnd by Jogatanas"
function Home() {
    useEffect(()=>{
        document.title='AfterEnd by Jogatanas';
    });

    
    // Exportação do componente Home como um objeto com a chave "Home"
    return ( 
        <>
            <Navbar />
            <Carousel />
            <Info />
            <Regras />
            <Equipa /> 
            <Footer />
        </>     
    );
}

export { Home };

/*
O componente Home renderiza a página inicial da aplicação. 
Importa os módulos e componentes necessários, como React, useEffect, Navbar, Equipa, Footer, Carousel, Regras e Info.
Dentro do componente, há um efeito (useEffect) que define o título da página como "AfterEnd by Jogatanas" ao montar o componente.
De seguida, os componentes Navbar, Carousel, Info, Regras, Equipa e Footer são renderizados na ordem desejada.
O componente Home é exportado como um objeto com a chave "Home", permitindo que seja importado e utilizado noutros lugares da aplicação.
*/