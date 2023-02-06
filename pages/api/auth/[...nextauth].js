import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "mubaha",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "OTP", type: "text" },
      },
      async authorize(credentials, req) {
        const payload = {
          phone: credentials.phone,
          code: credentials.code,
        };
        const res = await fetch(`${process.env.API_AUTH_URL}/verify-login-otp`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        if (response.status === 400) {
          const error = new Error(JSON.stringify(response));
          throw error;
        }
        // If no error and we have user data, return it
        if (res.ok && response.data) {
          return response.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    CredentialsProvider({
      id: "mubaha-login",
      name: "Credentials-login",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        const payload = {
          phone: credentials.phone,
          password: credentials.password,
        };
        const res = await fetch(`${process.env.API_AUTH_URL}/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();

        if (response.status === 400) {
          const error = new Error(JSON.stringify(response));
          throw error;
        }

        // If no error and we have user data, return it
        if (res.ok && response.data) {
          return response.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    CredentialsProvider({
      id: "mubaha-signup",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials-signup",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        const payload = {
          phone: credentials.phone,
          code: credentials.code,
        };
        const res = await fetch(`${process.env.API_AUTH_URL}/verify-register-otp`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        if (response.status === 400) {
          const error = new Error(JSON.stringify(response));
          throw error;
        }
        // If no error and we have user data, return it
        if (res.ok && response.data) {
          return response.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { account, token } = user;

        return {
          token,
          user: account,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.token;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
});
