import React, {useEffect} from 'react';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Main from './main';

export default function Termos() {
    useEffect(()=>{
        document.title='Termos e Condições'
    })

    return (  
        <>
            <Navbar />
            <Main />
            <Footer />
        </>
    );
}