import connectDB from "../../../lib/dbConnect";
import Movie from "../../../models/movie";

connectDB();

const moviesHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const { title, description, media } = req.body;
        const date = new Date();
        const newMovie = new Movie({
          title,
          description,
          media,
          id: date.getTime(),
        });
        res.status(200).json({
          message: "succes",
          data: await newMovie.save(),
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "error", data: err.message });
      }
    case "GET":
      try {
        const data = await Movie.find({});
        res.status(200).json({ message: "success", data });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "error", data: err.message });
      }
    default:
      res.status(422).json({
        message: "this request method is not supported",
      });
  }
};

export default moviesHandler;
