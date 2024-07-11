import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions:AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {

            console.log(user, account, profile)

            if (user?.email?.endsWith("@gmail.com")) {
                return true;
            } else {
                return false;
            }
        },
        async jwt({token, account}){
            if(account?.access_token) {
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({session, token}) {
            console.log("callback: "+ session)
            let _session = {...session, access_token: token.access_token}
            return _session;
        }
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
