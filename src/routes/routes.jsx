import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { FirebaseContext } from "../contexts/firebase";

// pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import MovieInfo from "../pages/MovieInfo";
import MovieList from "../pages/MovieList";

import NotFound from "../pages/NotFound";

import { PrivateRoutes } from "./privateRoutes";

export default function RoutesApp() {
  const { userData } = useContext(FirebaseContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes userData={userData} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/list" element={<MovieList />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
