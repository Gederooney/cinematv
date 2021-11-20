import connectDB from "../../../lib/dbConnect";
import User from "../../../models/user";

const userHandler = async (req, res) => {
  const { email } = req.query;
  connectDB();
  switch (req.method) {
    case "GET":
      try {
        const user = await User.findOne({ username: email }).select(
          "-password"
        );
        if (!user)
          return res
            .status(422)
            .json({ sucess: false, message: "no user found" });
        return res.status(200).json({ sucess: true, user });
      } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ sucess: false, message: "Server console.error();" });
      }
    default:
      return;
  }
};

export default userHandler;
