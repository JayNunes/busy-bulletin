import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={`sidebar ${open ? "active" : ""}`}>
      <div className="sidebar-content" ref={menuRef}>
        <div className="user" onClick={toggleMenu}>
          <Avatar src={user.photoURL} />
          <p>Hi, {user.displayName}!</p>
          {isMobile && <Navbar />}
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink onClick={toggleMenu} to="/">
                <img src={DashboardIcon} alt="Dashboard Icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={toggleMenu} to="/create">
                <img src={AddIcon} alt="Add Icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
