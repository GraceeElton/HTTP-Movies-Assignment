import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = () => {
  const { push } = useHistory();
  const { id } = useParams();
  const [newMovie, setNewMovie] = useState(initialItem);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log({ res });

        //res.data
        setNewMovie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setNewMovie({
      ...newMovie,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, newMovie)
      .then((res) => {
        console.log({ res });
        // props.movieList(res.data);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={newMovie.title}
        />
        <label>Director:</label>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={newMovie.director}
        />
        <label>Metascore:</label>
        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={newMovie.metascore}
        />

        <label>Stars:</label>
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="stars"
          value={newMovie.stars}
        />
        <button>Update Film</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
