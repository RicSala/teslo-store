// [...nextauth] means that any route after /api/auth/ will be handled by this file, even if it has multiple segments.


import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials" // provider for custom login with email and password
import { dbUsers } from "../../../../database"

// authOptions is the configuration object for next-auth where you can configure the authentication providers
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        // custom login provider
        Credentials({
            name: "Custom Login",
            credentials: {
                email: { label: "Correo", type: "email", placeholder: "tucorreo@google.com" },
                password: { label: "Contraseña", type: "password", placeholder: "********" },
            },
            // authorize is a function that receives the credentials and the request object
            // and validates the credentials, returning the user object if they are valid
            async authorize(credentials, req) {

                return await dbUsers.checkUserEmailPassword(credentials.email, credentials.password)

                // console.log("credentials", credentials)
                // return {
                //     name: "John Doe",
                //     email: "ricardo@google.com",
                //     role: "admin"
                // }

            }
        }),

        // github provider
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

    ],

    // custom pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    jwt: {
        // secret: process.env.JWT_SECRET, // deprecated
    },

    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        strategy: "jwt",
        updateAge: 24 * 60 * 60, // 24 hours
    },


    // callbacks
    callbacks: {



        // once the user is authenticated, a JWT token is created
        // depending on the provider, the token will have different properties available 
        // that we will add to the token object
        async jwt({ token, account, user }) {

            // console.log('JWT Callback:', { token, account, user });

            // acount exists only when the user is authenticated, not when the token is refreshed
            // so we are basically initializing the token with the account data
            if (account) {
                // console.log("account", { account })
                token.accessToken = account.access_token;
                switch (account.type) {

                    case 'oauth':
                        // console.log("oauth", { account })
                        token.user = await dbUsers.checkOauthUser(user.email, user.name);
                        // console.log("token.user", token.user)

                        break;

                    case 'credentials':
                        token.user = user;
                        break;

                }

            }
            return token;
        },

        // this function is responsible for customizing the token, and the session callback is responsible 
        // for customizing the session object that will be sent to the client.
        async session({ session, token, user }) {

            // console.log('Session Callback:', { session, token, user });

            try {
                session.accessToken = token.accessToken;
                session.user = token.user;
            } catch (error) {
                console.log("Error en sesión: ", error)
            }
            return session;
        }
    },
}

// sets up and exports the API route handler for authentication-related requests in your Next.js application
// that happen at the /api/auth endpoint.
export default NextAuth(authOptions)

// When users interact with the NextAuth sign-in, sign-out, or other authentication features, the
// requests will be sent to the /api/auth/[...nextauth].js endpoint. The handler returned by NextAuth(authOptions)
// takes care of processing these requests, handling the authentication flow, managing sessions,
// and communicating with the configured authentication providers.