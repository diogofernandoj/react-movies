import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [redirectTo, setRedirectTo] = useState("/login");

  useEffect(() => {
    if (localStorage.getItem("@userData") !== null) {
      setRedirectTo("/home");
    }
  }, []);

  return (
    <div className="not-found-container">
      <h2>Error 404</h2>
      <p>Ops! Página não encontrada.</p>
      <Link to={redirectTo}></Link>
    </div>
  );
}
