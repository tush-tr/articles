import React, {createContext, useState} from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {

    const token = localStorage.getItem("admin_token");

    const [ admin, setAdmin ] = useState({
        isLoggedIn: token ? true : false,
        token: token
    });

    return (
        <AdminContext.Provider value={[ admin, setAdmin ]}>
            {props.children}
        </AdminContext.Provider>
    );
}