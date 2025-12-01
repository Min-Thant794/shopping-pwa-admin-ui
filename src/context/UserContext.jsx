import { createContext, useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemToLocalStorage } from "../helpers/helper";
import { STORAGE_KEY } from "../config/config";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedData = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
        setUserData(storedData);
    }, [])

    const logout = () => {
        removeItemFromLocalStorage()
        setUserData(null)
    }

    const changeUserData = (data) => {
        logout();
    }

    return <UserContext.Provider value={{userData, setUserData, changeUserData, logout}}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext)