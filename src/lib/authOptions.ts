import { AuthOptions } from "next-auth";
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
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            
            console.log(user.email + " signed in")
            
            
            if (user?.email?.endsWith("@gmail.com")) {
                return true;
            } else {
                return false;
            }
        },
        async jwt({token, account, user}){
            
            if(account?.access_token) {
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({session, token}) {

            let role = "visitor";
            if(session.user?.email === "ady.ashim@gmail.com") role = "admin";
            if(session.user?.email === "pauljiya918@gmail.com") role = "pro";
            let _session = {...session, access_token: token.access_token, role: role}
            return _session;
        }
    },
}