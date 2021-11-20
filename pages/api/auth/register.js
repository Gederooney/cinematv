import connectDB from "../../../lib/dbConnect";
import User from "../../../models/user";
import { hashPassword } from "../../../lib/auth";

const registerHandler = async (req, res) => {
  connectDB();
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const data = req.body;

  switch (req.method) {
    case "POST":
      const { username, password } = data;
      if (
        !username ||
        !isEmail.test(username) ||
        !password ||
        password.trim().length < 8
      ) {
        res
          .status(422)
          .json({
            sucess: false,
            message: "Email and password can't be empty.",
          });
        return;
      }
      var newUser = await User.findOne({ username: username });
      if (newUser) {
        res
          .status(422)
          .json({ sucess: false, message: "Please use a new email or login" });
        return;
      } else {
        const encrypted = await hashPassword(password);
        newUser = await new User({
          username: username,
          password: encrypted,
          isAdmin: false,
        });
        const data = await newUser.save();
        return res.status(200).send({
          sucess: true,
          message: "user created",
          data: { username: data.username, isAdmin: data.isAdmin },
        });
      }
    default:
      break;
  }
};

export default registerHandler;
