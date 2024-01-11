import bcrypt from 'bcryptjs';
import { createContext, useState,useContext, useEffect } from 'react';
const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {

    
    const salt = bcrypt.genSaltSync(10);
    const key = bcrypt.hashSync('B4c0/\/', salt);
    
    const AppContextValue = {
        userLoggedIn: false,
        userId: '',
        code: '',
    }

    const loginUserContext = id => {
        AppContextValue.userLoggedIn = true;
        AppContextValue.userId = id;
    }
    const logOutUserContext = () => {
        AppContextValue.userLoggedIn = false;
        AppContextValue.userId = '';
    }

  
    const storeUserCode = code => {
        //AppContextValue.code = key.hashSync(code, salt);
        AppContextValue.code = bcrypt.hashSync(code, salt);
    }

    /**
     * The function `retreiveCode` compares a given key with a hashed code stored in the
     * `AppContextValue.code` variable.
     */
    const retreiveUserCode = () => {
        return key.compareSync(key, AppContextValue.code);
    }
    

    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
}

export { AppProvider, useAppContext };


