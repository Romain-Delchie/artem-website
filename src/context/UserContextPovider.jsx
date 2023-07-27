//UserContextProvider.jsx

import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

const UserContextProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [userState, setUserState] = useState(storedUser || { token: "", email: "", firstname: "", lastname: "" });

    useEffect(() => {
        // Sauvegarder l'état du contexte dans le localStorage chaque fois qu'il change
        localStorage.setItem('user', JSON.stringify(userState));
    }, [userState]);

    return (
        <AppContext.Provider value={{ user: userState, updateUser: setUserState }}>
            {children}
        </AppContext.Provider>
    );
};

export default UserContextProvider;