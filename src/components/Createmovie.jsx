import React, { useState } from "react";
import axios from "axios";

const fields = {
  title: { value: "", error: false, touched: false, required: true },
  type: { value: "", error: false, touched: false, required: true },
  producer: { value: "NULL", error: false, touched: false, required: false },
  quality: { value: "", error: false, touched: false, required: true },
  duration: { value: "", error: false, touched: false, required: true },
  year: {
    value: new Date().getFullYear(),
    error: false,
    touched: false,
    required: false,
  },
  actors: { value: "", error: false, touched: false, required: false },
  poster: { value: "", error: false, touched: false, required: true },
  media: { value: "", error: false, touched: false, required: true },
  isIframe: { value: false, error: false, touched: false, required: true },
  description: { value: "", error: false, touched: false, required: false },
};

class Movie {
  error;
  constructor(fields) {
    this.fields = fields;
  }

  getFields() {
    return this.fields;
  }
  getError() {
    return this.error;
  }
  setFields(targetName, targetValue) {
    this.fields[targetName].value = targetValue;
    if (!this.fields[targetName].touched)
      this.fields[targetName].touched = true;
    if (
      targetName === "title" ||
      targetName === "type" ||
      targetName === "media"
    ) {
      if (targetValue === "") {
        this.fields[targetName].error = true;
      } else {
        this.fields[targetName].error = false;
      }
    }
    this.error =
      this.fields.title.error ||
      this.fields.type.error ||
      this.fields.quality.error ||
      this.fields.duration.error ||
      this.fields.actors.error ||
      this.fields.media.error ||
      this.fields.poster.error ||
      this.fields.isIframe.error ||
      this.fields.description.error;
  }
  async insertMovie() {
    try {
      const body = {
        title: this.fields.title.value,
        producer: this.fields.producer.value,
        type: this.fields.type.value,
        quality: this.fields.quality.value,
        duration: this.fields.duration.value,
        year: this.fields.year.value,
        actors: this.fields.actors.value.trim().split(","),
        media: this.fields.media.value,
        poster: this.fields.poster.value,
        isIframe: this.fields.isIframe.value,
        description: this.fields.description.value,
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/movies/",
        body
      );
      console.log(data);
      return;
    } catch (error) {
      return console.log(error);
    }
  }
}

const Createmovie = () => {
  const [formData, setFormData] = useState(fields);
  const [canSubmit, setCanSubmit] = useState(false);
  const handleChange = (e) => {
    const movie = new Movie(formData);
    movie.setFields(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: movie.fields[e.target.name],
    });
    setCanSubmit(!movie.getError());
  };

  return (
    <div className="movie_form_wrapper p-3 my-3 col-lg-7 mx-auto">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await new Movie(formData).insertMovie();
        }}
      >
        <h2>Ajoutez un film</h2>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="title" className="form-label">
              Titre
            </label>
            <input
              type="text"
              className={
                (formData.title.required &&
                  formData.title.error &&
                  "form-control border border-danger py-2") ||
                "form-control py-2"
              }
              name="title"
              value={formData.title.value}
              onChange={(e) => handleChange(e)}
              required={formData.title.required}
            />
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <input
                type="text"
                name="type"
                className={
                  (formData.type.required &&
                    formData.type.error &&
                    "form-control border border-danger py-2") ||
                  "form-control py-2"
                }
                value={formData.type.value}
                onChange={(e) => handleChange(e)}
                required={formData.type.required}
              />
            </div>
          </div>
        </div>
        <div className="mb-3 row row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
          <div className="col">
            <label htmlFor="producer" className="form-label">
              Producteur
            </label>
            <input
              type="text"
              className={
                (formData.producer.required &&
                  formData.producer.error &&
                  "form-control py-2 border border-danger") ||
                "form-control py-2"
              }
              value={formData.producer.value}
              name="producer"
              onChange={(e) => handleChange(e)}
              required={formData.producer.required}
            />
          </div>
          <div className="col">
            <label htmlFor="quality" className="form-label">
              Qualité
            </label>
            <select
              className={
                (formData.quality.required &&
                  formData.quality.error &&
                  "form-control py-2 border border-danger") ||
                "form-control py-2"
              }
              value={formData.quality.value}
              name="quality"
              onChange={(e) => handleChange(e)}
              required={formData.quality.required}
            >
              <option>720</option>
              <option>HD</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="duration" className="form-label">
              Durée
            </label>
            <select
              className={
                (formData.duration.required &&
                  formData.duration.error &&
                  "form-control py-2 border border-danger") ||
                "form-control py-2"
              }
              value={formData.duration.value}
              name="duration"
              onChange={(e) => handleChange(e)}
              required={formData.duration.required}
            >
              {Array.from({ length: 90 }, (_, i) => i + 60).map((min) => {
                return <option key={`${min}minutes`}>{min}</option>;
              })}
            </select>
          </div>
          <div className="col">
            <label htmlFor="year" className="form-label">
              Année
            </label>
            <select
              className={
                (formData.year.required &&
                  formData.year.error &&
                  "form-control py-2 border border-danger") ||
                "form-control py-2"
              }
              value={formData.year.value}
              name="year"
              onChange={(e) => handleChange(e)}
              required={formData.year.required}
            >
              {Array.from({ length: 30 }, (_, i) => i + 2000).map((min) => {
                return <option key={`${min}minutes`}>{min}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="actors" className="form-label">
            Acteurs
          </label>
          <input
            type="text"
            name="actors"
            value={formData.actors.value}
            onChange={(e) => handleChange(e)}
            className={
              (formData.actors.required &&
                formData.actors.error &&
                "form-control py-2 border border-danger") ||
              "form-control py-2"
            }
            required={formData.actors.required}
          />
        </div>
        <div className="mb-3 row row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
          <div className="col">
            <label htmlFor="media" className="form-label">
              Média
            </label>
            <input
              type="text"
              name="media"
              value={formData.media.value}
              onChange={(e) => handleChange(e)}
              className={
                (formData.media.required &&
                  formData.media.error &&
                  "form-control py-2 border border-danger") ||
                "form-control py-2"
              }
              required={formData.media.required}
            />
          </div>
          <div className="col">
            <label htmlFor="poster" className="form-label">
              Poster
            </label>
            <input
              type="text"
              className={
                (formData.poster.required &&
                  formData.poster.error &&
                  "form-control py-2 border border-danger") ||
                "form-control py-2"
              }
              name="poster"
              value={formData.poster.value}
              onChange={(e) => handleChange(e)}
              required={formData.poster.required}
            />
          </div>
          <div className="col">
            <label htmlFor="isIframe" className="form-label">
              Un iframe??
            </label>
            <select
              name="isIframe"
              value={formData.isIframe.value}
              onChange={(e) => handleChange(e)}
              className={
                (formData.isIframe.error &&
                  formData.isIframe.required &&
                  "form-control border border-danger py-2") ||
                "form-control py-2"
              }
              required={formData.isIframe.required}
            >
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label className="form-label" htmlFor="description">
            Ajoutez une description du film
          </label>
          <textarea
            className={
              (formData.description.required &&
                formData.description.error &&
                "form-control py-2 border border-danger") ||
              "form-control py-2"
            }
            name="description"
            cols="30"
            rows="10"
            value={formData.description.value}
            onChange={(e) => handleChange(e)}
            required={formData.description.required}
          ></textarea>
        </div>
        <div className="mb-3 row">
          {canSubmit && (
            <button type="submit" className="col-6 btn form_btn mx-auto">
              Créer le film
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Createmovie;
