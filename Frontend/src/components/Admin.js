import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { Switch, useHistory, useRouteMatch, Route } from "react-router-dom";
import "../styles/Admin/sb-admin-2.css";
import AdminSidebar from "./AdminSidebar";
import AdminDashbaord from "./AdminDashboard";
import AdminPublishedArticles from "./AdminPublishedArticles";

const AdminDashboard = () => {

    const [ user, setUser ] = useContext(UserContext);

    const history = useHistory();

    const { path } = useRouteMatch();

    if (!user.isAdminLoggedIn) {
        history.push("/admin/login");
    }

    return (
        <div id="wrapper">
            <AdminSidebar />
            <Switch>
                <Route exact path={`${path}/dashboard`} component={ AdminDashbaord }/>
                <Route path={`${path}/published-articles`} component={ AdminPublishedArticles } />
            </Switch>
        </div>
    )
}

export default AdminDashboard
