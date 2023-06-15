import React, {useEffect} from 'react';

import NavbarOutras from '../../../components/NavBarOutras';
import Footer from '../../../components/Footer';
import Main from './main';

export default function Login() {
    useEffect(()=>{
        document.title='Login'
    })

    return (  
        <>
            <NavbarOutras />
            <Main />
            <Footer />
        </>
    );
}