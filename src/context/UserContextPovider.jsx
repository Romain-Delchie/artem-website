import React, { useState, useEffect } from 'react';
import API, {
  registerLogoutCallback,
  resetLogoutState,
} from "../utils/api/api";
import AppContext from './AppContext';

const UserContextProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [userState, setUserState] = useState(storedUser || { token: "", email: "", firstname: "", lastname: "" });
    const [products, setProducts] = useState(null);
    const [ranges, setRanges] = useState([]);
    const [openAddProductForm, setOpenAddProductForm] = useState(false);

    const logout = (showAlert = false) => {
   setUserState({
     token: "",
     email: "",
     firstname: "",
     lastname: "",
   });

   localStorage.removeItem("user");

   if (showAlert) {
     alert("Votre session a expiré, veuillez vous reconnecter");
     }
     
 };
    
    useEffect(() => {
      registerLogoutCallback(logout);
    }, []);

    useEffect(() => {
        // Sauvegarder l'état du contexte dans le localStorage chaque fois qu'il change
        localStorage.setItem('user', JSON.stringify(userState));
    }, [userState]);



    useEffect(() => {
        localStorage.setItem('ranges', JSON.stringify(ranges));
        // Sauvegarder l'état du contexte dans le localStorage chaque fois qu'il change
    }, [ranges]);

    return (
      <AppContext.Provider
        value={{
          user: userState,
          updateUser: setUserState,
          logout,
          products,
          setProducts,
          ranges,
          setRanges,
          openAddProductForm,
          setOpenAddProductForm,
        }}
      >
        {children}
      </AppContext.Provider>
    );
};

export default UserContextProvider;