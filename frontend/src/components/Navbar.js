import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../redux/actions/userAction";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.signIn);

  // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Snapify
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <Link
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                  to="/"
                >
                  Home
                </Link>
              </a>
            </li>

            {userInfo ? (
              <>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none", color: "#FFFFFF" }}
                      to={userInfo.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                    >
                      Dashboard
                    </Link>
                  </a>
                </li>
                {userInfo.role === "admin" && <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none", color: "#FFFFFF" }}
                      to="/admin/create/post"
                    >
                      Create Post
                    </Link>
                  </a>
                </li>}
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={logOutUser}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none", color: "#FFFFFF" }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link style={{ textDecoration: "none" }} to="/login">
                      Login
                    </Link>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
