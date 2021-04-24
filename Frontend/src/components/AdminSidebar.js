import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

const AdminSidebar = () => {

  const [ user, setUser ] = useContext(UserContext);

  const history = useHistory();

  const logout = () => {
      setUser({
          isAdminLoggedIn: false,
          admin_token: ""
      });
      localStorage.removeItem("admin_token");
      history.push("/admin/login");
  }

  return (
    <div>
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          class="sidebar-brand d-flex align-items-center justify-content-center"
          to="/admin/dashboard"
        >
          <div class="sidebar-brand-icon">
            <i class="fas fa-users-cog"></i>
          </div>
          <div class="sidebar-brand-text mx-3">ReaderSpot Admin</div>
        </Link>
        <hr class="sidebar-divider my-0" />
        <li class="nav-item active">
          <Link class="nav-link" to="/admin/dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr class="sidebar-divider" />
        <div class="sidebar-heading">Interface</div>
        <li class="nav-item">
          <Link class="nav-link" to="/admin/all-articles">
            <i class="fas fa-fw fa-scroll"></i>
            <span>All Articles</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/admin/to-be-verified-articles">
            <i class="fas fa-fw fa-user-check"></i>
            <span>To be verified</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/admin/reports">
            <i class="fas fa-fw fa-flag"></i>
            <span>Reports</span>
          </Link>
        </li>
        <li class="nav-item">
          <div class="nav-link" to="/admin/reports" onClick={logout}>
            <i class="fas fa-fw fa-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
