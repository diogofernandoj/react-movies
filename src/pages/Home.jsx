import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: "a7d1942ad45e9230a62621d4268e5859",
          language: "pt-BR",
        },
      });
      setMovies(response.data.results);
      setLoading(false);
    };
    loadMovies();
  }, []);

  return loading ? (
    <div className="loading">Carregando...</div>
  ) : (
    <div className="movies-container">
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <h2>{movie.title}</h2>
          <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Capa do filme" />
            <Link to={`/movie/${movie.id}`}>Acessar</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
