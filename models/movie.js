import mongoose from "mongoose";

let MovieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please add an id"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  producer: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "The type of the movie is required"],
  },
  quality: {
    type: String,
  },
  duration: {
    type: String,
  },
  year: {
    type: String,
  },
  actors: {
    type: Array,
  },
  poster: {
    type: String,
  },
  media: {
    type: String,
  },
  isIframe: {
    type: Boolean,
    required: [true, "An iframe type is required"],
  },
});
const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
export default Movie;
