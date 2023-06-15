import React, {useEffect} from 'react';
import Navbar from '../../../components/Navbar';
import Equipa from '../../../components/Equipa';
import Footer from '../../../components/Footer';
import Carousel from '../../../components/Carousel'; 
import Regras from '../../../components/Regras';
import Info from '../../../components/Info';

function Home() {
    useEffect(()=>{
        document.title='AfterEnd by Jogatanas'
    })

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