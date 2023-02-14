import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../services/firebaseConnection";

import "./MovieInfo.css";

export default function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieOnList, setMovieOnList] = useState(false);
  const [loading, setLoading] = useState(true);

  const getLocalStorage = () => JSON.parse(localStorage.getItem("@userData"));
  const setLocalStorage = (data) => localStorage.setItem("@userData", JSON.stringify(data));

  const checkMovieOnList = (data) => {
    const { movieList } = getLocalStorage();
    const checkMovie = movieList.some((item) => item.id == id);
    if (checkMovie) {
      setMovieOnList(true);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: "a7d1942ad45e9230a62621d4268e5859",
          language: "pt-BR",
        },
      });
      setMovie(response.data);
      checkMovieOnList(response.data);
      setLoading(false);
    };
    loadMovie();
  }, []);

  const removeFromList = async (data, list) => {
    const newMovieList = list.filter((item) => item.id !== id);

    const newUserData = { ...data, movieList: newMovieList };
    setLocalStorage(newUserData);

    await updateDoc(doc(db, "userData", data.uid), {
      movieList: newMovieList,
    }).then(() => setMovieOnList(false));
  };
  const addToList = async (data, list) => {
    const newMovieList = [...list, { id: id, title: movie.title }];

    const newUserData = { ...data, movieList: newMovieList };
    setLocalStorage(newUserData);

    await updateDoc(doc(db, "userData", data.uid), {
      movieList: newMovieList,
    }).then(() => setMovieOnList(true));
  };

  const handleListButton = async () => {
    const userData = getLocalStorage();
    const { movieList } = getLocalStorage();

    if (movieOnList === true) {
      removeFromList(userData, movieList);
    }
    if (movieOnList === false) {
      addToList(userData, movieList);
    }
  };

  return loading ? (
    <div className="loading">Carregando...</div>
  ) : (
    <div className="movie-info-container">
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Poster do filme" />
      <p>{movie.overview}</p>
      <div className="movie-info-buttons">
        <button className="save-to-list" onClick={handleListButton}>
          {movieOnList ? "Salvo " : "Salvar "}
          <i className={`fa-solid fa-${movieOnList ? "check" : "plus"}`}></i>
        </button>
        <a href={`https://www.youtube.com/results?search_query=${movie.title} Trailer`} target="blank" className="trailer">
          Trailer
        </a>
      </div>
    </div>
  );
}
