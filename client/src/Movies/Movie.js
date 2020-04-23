import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log({ res });
        //res.data

        //need to update state so you dont have to reload the page??? but how?
        push("/");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => push(`/update-item/${movie.id}`)}>
        Edit Movie
      </button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;
