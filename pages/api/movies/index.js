import connectDB from "../../../lib/dbConnect";
import Movie from "../../../models/movie";

connectDB();

const moviesHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const {
          title,
          type,
          producer,
          quality,
          duration,
          year,
          actors,
          poster,
          media,
          isIframe,
          description,
        } = req.body;
        const date = new Date();
        const newMovie = new Movie({
          title,
          type,
          producer,
          quality,
          duration,
          year,
          actors,
          poster,
          media,
          isIframe,
          description,
          id: date.getTime(),
        });
        return res.status(200).json({
          message: "succes",
          data: await newMovie.save(),
        });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "error", data: err.message });
      }
    case "GET":
      try {
        const data = await Movie.find({}).sort({ _id: -1 });
        return res.status(200).json({
          message: "success",
          data,
        });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "error", data: err.message });
      }
    default:
      res.status(422).json({
        message: "this request method is not supported",
      });
  }
};

export default moviesHandler;
