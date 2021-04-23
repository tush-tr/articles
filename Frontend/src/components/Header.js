 import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

// this is not a final header, need to be changed
function Header() {

    const [ user, setUser ] = useContext(UserContext);

    const history = useHistory();

    const logout = () => {
        setUser({
            isLoggedIn: false,
            id: "",
            name: "",
            email: "",
            token: ""
        });
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        history.push("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
                <Link className="navbar-brand" to="/">ReaderSpot</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/About">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/article/create">Write</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        { user.isLoggedIn ?
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbar-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    { user.name }
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <Link className="dropdown-item" to="/settings">Settings</Link>
                                    <button className="dropdown-item" onClick={logout}>Logout</button>
                                </div>
                            </li> 
                            :
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;