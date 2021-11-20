import connectDB from "../../../lib/dbConnect";
import Movie from "../../../models/movie";

connectDB();

const singleMovieHandler = async (req, res) => {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const movie = await Movie.findOne({ id: id });
        if (!movie)
          return res.status(404).json({ sucess: false, message: "Not found" });
        return res.status(200).json({ sucess: true, movie: movie });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ sucess: false, message: err.message });
      }
    case "PUT":
      try {
        const movie = await Movie.findOneAndUpdate({ id }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!movie) return res.status(400).json({ sucess: false });
        return res.status(200).json({ sucess: true, data: movie });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ sucess: false, message: err.message });
      }
    case "DELETE":
      try {
        const movie = await Movie.findOneAndDelete({ id });
        if (!movie)
          return res
            .status(404)
            .json({ sucess: false, message: "Movie not found" });
        return res.status(200).json({ sucess: true, deletedMovie: movie });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ sucess: false, message: err.message });
      }
    default:
      return res.status(422).json({
        message: "this request method is not supported",
      });
  }
};

export default singleMovieHandler;
