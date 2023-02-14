import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../services/firebaseConnection";
import { FirebaseContext } from "../contexts/firebase";

import "./Form.css";

export default function Login() {
  const navigate = useNavigate();

  const { setUserData } = useContext(FirebaseContext);

  const setLocalStorage = (data) => localStorage.setItem("@userData", JSON.stringify(data));

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("@userData") !== null) {
      navigate("/home");
    }
  }, []);

  const { register, handleSubmit } = useForm();

  const handleLoginButton = async (data) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (snapshot) => {
        await getDoc(doc(db, "userData", snapshot.user.uid)).then((snapshot) => {
          const tempData = {
            uid: snapshot.data().uid,
            username: snapshot.data().username,
            email: snapshot.data().email,
            movieList: snapshot.data().movieList,
          };
          setLocalStorage(tempData);
          setUserData(tempData);
          navigate("/home");
        });
      })
      .catch(() => setErrorMessage(true), setLoading(false));
  };

  const [errorMessage, setErrorMessage] = useState(false);

  return loading ? (
    <div className="loading">Carregando...</div>
  ) : (
    <div className="form-container">
      <div className="form">
        <h2>Login</h2>
        {errorMessage && <small className="error-message">Email e/ou senha inválidos!</small>}
        <input type="email" placeholder="Insira seu email" {...register("email")} />
        <input type="password" placeholder="Insira sua senha" {...register("password")} />
        <button onClick={() => handleSubmit(handleLoginButton)()}>Entrar</button>
        <Link to="/register">Não tem conta? Cadastre-se</Link>
      </div>
    </div>
  );
}
