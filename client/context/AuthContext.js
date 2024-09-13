'use client'

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ name: '' }); // Ajout d'une valeur par défaut

export const AuthProvider = ({ children }) => {

    return (
        <AuthContext.Provider value={{ name: 'elsa' }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
