import { Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../services/firebaseConnection";

import "./MovieList.css";
import { useEffect, useState } from "react";

export default function MovieList() {
  const getLocalStorage = () => JSON.parse(localStorage.getItem("@userData"));
  const setLocalStorage = (data) => localStorage.setItem("@userData", JSON.stringify(data));

  const [list, setList] = useState([]);

  useEffect(() => {
    const { movieList } = getLocalStorage();
    setList(movieList);
  }, []);

  const removeFromList = async (movieId) => {
    const newMovieList = list.filter((movie) => movie.id !== movieId);

    const data = getLocalStorage();
    const newUserData = { ...data, movieList: newMovieList };
    setLocalStorage(newUserData);

    await updateDoc(doc(db, "userData", data.uid), {
      movieList: newMovieList,
    }).then(() => setList(newMovieList), toast.success("Filme removido com sucesso!"));
  };

  return (
    <div className="movie-list-container">
      <h2>Lista de filmes</h2>
      {list.length === 0 ? (
        <p>Você não adicionou nenhum filme a lista.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome do filme</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {list.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>
                  <Link to={`/movie/${movie.id}`}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Link>
                  <i className="fa-solid fa-trash" onClick={() => removeFromList(movie.id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
