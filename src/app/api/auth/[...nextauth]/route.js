import clientPromise from "@/app/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // 3 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db("users");
          const user = await db.collection("users").findOne({
            email: credentials.email,
          });
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            console.log(user);
            return {
              _id: user._id,
              name: user.name,
              email: user.email,
            };
          } else {
            throw new Error("Invalid Email or Password");
          }
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
