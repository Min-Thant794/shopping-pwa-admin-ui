import { createContext, useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "../helpers/helper";
import { STORAGE_KEY } from "../config/config";

const userContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState();
    useEffect(() => {
        const storedData = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
        setUserData(storedData);
    }, [])

    useEffect(() => {
        console.log("User Data: ", userData)
    }, [userData])

    const logout = () => {
        removeItemFromLocalStorage()
        setUserData(null)
    }

    return <userContext.Provider value={{userData, setUserData, logout}}>
        {children}
    </userContext.Provider>
}

export const useUser = () => useContext(userContext)