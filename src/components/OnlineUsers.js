import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    const sortUsers = (users) => {
      let sortedArray = [];
      users.map((user) => {
        if (user.online) {
          sortedArray.unshift(user);
        } else sortedArray.push(user);
      });
      return sortedArray;
    };
    if (documents) {
      setSortedUsers(sortUsers(documents));
    }
    return () => setSortedUsers(null);
  }, [documents]);

  const [open, setOpen] = useState(false);
  let staffListRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    let handler = (e) => {
      if (!staffListRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();

    setOpen(!open);
  };

  return (
    <div
      onClick={toggleMenu}
      className={`user-list ${open ? "active" : ""}`}
      ref={staffListRef}
    >
      {!isMobile && <h2>Who's Online:</h2>}
      {error && <div className="error">{error}</div>}
      {isMobile && open ? (
        <h2>Who's Online:</h2>
      ) : (
        isMobile && (
          <div onClick={toggleMenu} className="online-user-icon"></div>
        )
      )}
      {(open || !isMobile) &&
        sortedUsers &&
        sortedUsers.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
