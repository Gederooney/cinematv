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
  media: {
    type: String,
    required: [true, "Please add a media"],
  },
});
const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
export default Movie;
