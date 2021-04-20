import React, {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [user, setUser] = useState({
        isLoggedIn: false,
        name: "",
        email: "",
        token: ""
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}