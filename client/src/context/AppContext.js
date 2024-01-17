import bcrypt from 'bcryptjs';
import { createContext } from 'react';
import { useContext } from 'react';

const AppContext = createContext();
const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
    const AppContextValue = {
        jwt: null,
        code: null,
        user: null,
        loginUserContext: (jwt) => {
            AppContextValue.jwt = jwt;
        },
        storeUserContext: (user) => {
            AppContextValue.user = user;
        },
        storeCodeContext: (code) => {
            AppContextValue.code = code;
        },
        verifyCodeContext: (code) => {
            return AppContextValue.code === code;
        },
        logoutUserContext: () => {
            AppContextValue.jwt = null;
            AppContextValue.code = null;
            AppContextValue.user = null;
        },
        hashPassword: (password) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            return hash;
        },
        comparePassword: (password, hash) => {
            return bcrypt.compareSync(password, hash);
        }
    };
    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
}

export { AppProvider, useApp };