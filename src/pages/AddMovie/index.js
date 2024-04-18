import React, { useState } from "react";
import "./index.css";
import * as client from "./client";
import {  useNavigate } from "react-router-dom";

const AddMovie = ({ adminMovies, setAdminMovies }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    actors: "",
    description: "",
    primary_image: { url: "" },
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "primary_image") {
      setFormData({ ...formData, primary_image: { url: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    const movieData = {
      title: formData.title,
      rating: formData.rating,
      actors: formData.actors,
      description: formData.description,
      primary_image: {
        url: formData.primary_image.url,
      },
    };
    const titles = movieData;
    e.preventDefault();
    setAdminMovies((prevAdminMovies) => [...prevAdminMovies, movieData]);
    try {
      await client.createMovie(titles);
    } catch (error) {
      console.error("Error creating movie:", error);
      throw error;
    }
  };

  return (
    <div className="im-form">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Rating:
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Actors:
            <input
              type="text"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Primary Image URL:
            <input
              type="text"
              name="primary_image"
              value={formData.primary_image ? formData.primary_image.url : ""}
              onChange={handleChange}
              className="form-control"
            />
          </label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
