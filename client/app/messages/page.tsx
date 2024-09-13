'use client'

import { Header } from '@/app/components/customsComponents/layout/Header'
import { NavMenu } from '@/app/enums/NavMenuEnum'
import AuthContext from '@/context/AuthContext'
import React, { useContext } from 'react'

const messages = () => {
    const context = useContext(AuthContext);

    console.log("AuthContext:", context);

    if (!context) {
        // Gérer le cas où le contexte est undefined
        return <div>Erreur : Contexte non défini</div>;
    }

    let { name } = context;

    return (
        <div className='mt-48'>
            <Header title={NavMenu.MESSAGES} />
            <div>messages</div>
            <p>Hello {name}</p>
        </div>
    );
}

export default messages