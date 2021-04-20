import React, {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {

    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    const [user, setUser] = useState({
        isLoggedIn: token ? true : false,
        name: name,
        email: email,
        token: token
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}