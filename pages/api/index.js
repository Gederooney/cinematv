import connectDB from "../../lib/dbConnect";

connectDB();

export default async (req, res) => {
  try {
    res.json({ message: "api is up" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
