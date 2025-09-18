import { createContext, useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "../helpers/helper";
import { STORAGE_KEY } from "../config/config";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState();
    useEffect(() => {
        const storedData = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
        console.log("Stored Data: ", storedData);
        setUserData(storedData);
    }, [])

    useEffect(() => {
        console.log("User Data: ", userData)
    }, [userData])

    const logout = () => {
        removeItemFromLocalStorage()
        setUserData(null)
    }

    return <UserContext.Provider value={{userData, setUserData, logout}}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext)