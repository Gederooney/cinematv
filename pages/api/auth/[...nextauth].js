import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import connectDB from "../../../lib/dbConnect";
import { verifyPassword } from "../../../lib/auth";
import User from "../../../models/user";

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await connectDB();
        const { username, password } = credentials;
        const user = await User.findOne({ username: username });
        if (!user) throw new Error("Invalid credentials");
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");
        return { email: user.username };
      },
    }),
  ],
});
