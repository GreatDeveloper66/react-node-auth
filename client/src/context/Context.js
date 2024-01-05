import { createContext, useState,useContext, useEffect } from 'react';
const AppContext = createContext();
const useAppContext = () => useContext(AppContext);
import { bcrypt } from 'bcrypt';
const key = new bcrypt();
const salt = key.genSaltSync(10);

const AppProvider = ({ children }) => {
    
    const AppContextValue = {
        userLoggedIn: false,
        userId: '',
        code: '',
    }

    const loginUser = id => {
        AppContextValue.userLoggedIn = true;
        AppContextValue.userId = id;
    }
    const logoutUser = () => {
        AppContextValue.userLoggedIn = false;
        AppContextValue.userId = '';
    }

  
    const storeCode = code => {
        AppContextValue.code = key.hashSync(code, salt);
    }

    /**
     * The function `retreiveCode` compares a given key with a hashed code stored in the
     * `AppContextValue.code` variable.
     */
    const retreiveCode = () =>
    

    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
}


