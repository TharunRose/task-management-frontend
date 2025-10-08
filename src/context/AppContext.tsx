import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axiosConfig";

const AppContext = createContext(null)

export const ContextProvider = ({ children }) => {


    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {

        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await API.get("/auth/users");
        setUsers(data);
    };


    return (

        <AppContext.Provider value={{ users, setUsers, fetchUsers }} >
            {children}
        </AppContext.Provider>

    )

}

export const useAppContext = () => useContext(AppContext)