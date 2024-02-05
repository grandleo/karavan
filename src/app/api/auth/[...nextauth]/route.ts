import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {http} from "@/config/http";
import {LOGIN_URL} from "@/config/apiRoutes";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                pin: { label: "Pin code", type: "text" }
            },
            async authorize(credentials, req) {
                const auth = await http.post(LOGIN_URL, {email: credentials?.email, pin: credentials?.pin});

                const user = auth.data

                if (user) {

                    return user;

                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * (24 * 60 * 60), // (24 * 60 * 60) is 1 day
    },
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (user?.id) token.id = user.id;
            if (user?.surname) token.surname = user.surname;
            if (user?.patronymic) token.patronymic = user.patronymic;
            if (user?.role) token.role = user.role;
            if (user?.accessToken) token.accessToken = user.accessToken;
            return token;
        },
        async session({ session, token }: any) {
            if (token.id && session.user) session.user.id = token.id;
            if (token.role && session.user) session.user.role = token.role;
            if (token.surname && session.user) session.user.surname = token.surname;
            if (token.patronymic && session.user) session.user.patronymic = token.patronymic;
            if (token.accessToken && session.user) session.accessToken = token.accessToken;
            return session;
        },
    },

});

export {handler as GET, handler as POST}