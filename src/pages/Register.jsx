import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { auth, db } from "../services/firebaseConnection";
import { FirebaseContext } from "../contexts/firebase";

import "./Form.css";

export default function Register() {
  const { setUserData } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const setLocalStorage = (data) => localStorage.setItem("@userData", JSON.stringify(data));

  useEffect(() => {
    if (localStorage.getItem("@userData") !== null) {
      navigate("/home");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const newRegister = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (value) => {
        const tempData = { uid: value.user.uid, username: data.username, email: data.email, movieList: [] };
        await setDoc(doc(db, "userData", value.user.uid), tempData);
        setLocalStorage(tempData);
        setUserData(tempData);
        navigate("/home");
      })
      .catch((error) => alert("Algo deu errado! Tente novamente. Erro: ", JSON.stringify(error)));
  };

  return (
    <div className="form-container">
      <div className="form">
        <h2>Cadastre-se</h2>

        <div className={`form-field${errors?.username ? " error" : ""}`}>
          <input type="text" placeholder="Nome de usuário" maxLength="16" {...register("username", { required: true, minLength: 3 })} />
          <i className="fa-solid fa-circle-exclamation"></i>
          <small>
            {errors?.username?.type === "required" && "O nome é obrigatório"}
            {errors?.username?.type === "minLength" && "O nome deve conter 3 caracteres"}
          </small>
        </div>

        <div className={`form-field${errors?.email ? " error" : ""}`}>
          <input type="email" placeholder="Email" {...register("email", { required: true, validate: (value) => validator.isEmail(value) })} />
          <i className="fa-solid fa-circle-exclamation"></i>
          <small>
            {errors?.email?.type === "required" && "O email é obrigatório"}
            {errors?.email?.type === "validate" && "O email inserido é inválido"}
          </small>
        </div>

        <div className={`form-field${errors?.password ? " error" : ""}`}>
          <input type="password" placeholder="Senha" {...register("password", { required: true, minLength: 6 })} />
          <i className="fa-solid fa-circle-exclamation"></i>
          <small>
            {errors?.password?.type === "required" && "A senha é obrigatória"}
            {errors?.password?.type === "minLength" && "A senha deve conter 6 dígitos"}
          </small>
        </div>

        <div className={`form-field${errors?.terms ? " error" : ""}`}>
          <div className="form-terms">
            <input type="checkbox" id="terms" {...register("terms", { required: true })} />
            <label htmlFor="terms">Li e aceito os termos.</label>
          </div>
          <small>{errors?.terms?.type === "required" && "Você deve concordar com os termos"}</small>
        </div>

        <button onClick={() => handleSubmit(newRegister)()}>Cadastrar</button>
        <Link to="/login">Ja tem conta? Entrar</Link>
      </div>
    </div>
  );
}
