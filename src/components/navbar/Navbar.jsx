import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  // Sign Out method:
  const userLoginOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successfully");
      })
      .catch((error) => console.log(error));
  };
  // Login method :
  const handleLogin = () => {
    if (authUser && authUser.email) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  // Logout method :
  const handleLogout = () => {
    userLoginOut();
  };
  return (
    <div className="navbar-container">
       
      <Link to="/" className="web-name">
        NOAH
      </Link>
      <ul className="menu">
        <li>
          <NavLink to="/chats" className="cht-link" disabled={true}>
            ChatBot
          </NavLink>
        </li>
        <li>
          {authUser && authUser.email ? (
            <NavLink onClick={handleLogout} className="btn">
              Logout
            </NavLink>
          ) : (
            <NavLink onClick={handleLogin} className="btn">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
