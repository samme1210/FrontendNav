import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav({ login, logout, register, user, loading }) {
  return (
    <div>
      <div className="nav__container">
        <div className="nav__logo">
          <div className="nav__icon">
            <FontAwesomeIcon icon="bars" />
          </div>
          <h1 className="nav__title">
            <span className="bold">Frontend</span> Simplified
          </h1>
        </div>
        <ul className="nav__links">
          {loading ? (
            <div className="skeleton__profile"></div>
          ) : user.email ? (
            <button className="user__profile" onClick={logout}>
              {user.email[0]}
            </button>
          ) : (
            <>
              <button className="btn login" onClick={login}>
                Login
              </button>
              <button className="btn register" onClick={register}>
                Register
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Nav;
