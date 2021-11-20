import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: [true, "you must provid the type of user"],
  },
  username: {
    type: String,
    required: [true, "A username is required to created a user"],
  },
  password: {
    type: String,
    required: [true, "You must provide a password to create a user"],
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
