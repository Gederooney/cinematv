import connectDB from "../../lib/dbConnect";

connectDB();

export default async (req, res) => {
  try {
    return res.json({ message: "api is up" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
