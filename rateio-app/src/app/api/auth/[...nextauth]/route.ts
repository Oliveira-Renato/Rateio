import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const { GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '' } = process.env;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token }) {
      try {
        session.accessToken = token.accessToken as string
        session.googleId = token.sub
        return session
      } catch (error) {
        console.error("Error in session callback:", error);
        throw error; // Re-throw the error to stop the authentication process
      }
    },
    async jwt({ token, account }: any) {
      try {
        if (account) {
          token.accessToken = account.access_token;
          token.id_token = account.id_token;
          token.provider = account.provider;
          token.googleId = account.id;
        }
        return token

      } catch (error) {
        console.error("Error in jwt callback:", error);
        throw error; // Re-throw the error to stop the authentication process
      }
    }
  }
});

export { handler as GET, handler as POST };
