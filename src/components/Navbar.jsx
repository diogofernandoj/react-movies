import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { auth } from "../services/firebaseConnection";
import { FirebaseContext } from "../contexts/firebase";

import "./Navbar.css";

export default function Navbar() {
  const { userData, setUserData } = useContext(FirebaseContext);

  const handleSignout = async () => {
    await signOut(auth).then(() => {
      localStorage.removeItem("@userData");
      setUserData(null);
    });
  };

  if (!userData) {
    return <div></div>;
  }

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="profile">
          <div className="icon-profile">{userData.username.split("")[0].toUpperCase()}</div>
          <span>{userData.username.split(" ")[0]}</span>
        </div>
        <Link to="/home" className="logo">
          <span>the</span>Movies
        </Link>
        <div className="menu">
          <Link to="/list" className="list-button">
            Minha lista
          </Link>
          <button className="signout-button" onClick={handleSignout}>
            <span>Sair</span>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
