import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "./connectDB";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import generateApiKey from "./generateApiKey";

function getGoogleCredintials(){
    const clientId = process.env.GOOGLE_CLIENTID;
    const clientSecret = process.env.GOOGLE_CLIENTSECRET;

    if(!clientId)
        throw new Error("Google client id is missing. Please try again later!");
    if(!clientSecret)
        throw new Error("Google client secret is missing. Please try again later!");
    
    return {clientId,clientSecret}
}

export const authOptions: NextAuthOptions = {
    session:{
        strategy: "jwt"
    },
    providers:[
        GoogleProvider({
            clientId:getGoogleCredintials().clientId,
            clientSecret:getGoogleCredintials().clientSecret,
        }),
    ],
    callbacks:{
        async signIn({user,account}){
            try{
                if(process.env.MONGO_URI){
                    await connectDb(process.env.MONGO_URI);

                    const existingUser = await User.findOne({name:user.name,email:user.email});

                    if(!existingUser)
                    {
                        delete user.id;
                        const apiKey = generateApiKey();
                        user.apiKey = apiKey;
                        
                        
                        const newUser = await User.create({name:user.name,email:user.email,image:user.image,apiKey:user.apiKey});
                    }
                }
                else throw new Error("Cannot connected to the database!");
                
            }catch(err){
                console.log(err);
            }

            return true;
        },
        async jwt({token,user,account}){
            if(token && account){
                token.id_token=account.id_token;
            }
            return token
        },
        async session({session,token}){
            try{
                if(session && session.user && token && token.id_token){
                    session.user.token=String(token.id_token);
                }
                const currentUser = await User.findOne({name:session.user?.name,email:session.user?.email});
                
                if (session.user && currentUser) {
                    session.user._id = String(currentUser._id);
                    session.user.projects = currentUser.projects;
                }
                
            }catch(err){
                console.log(err);
                
            }
            return session;
        }
    }
}

export const getAuthSession = ()=>getServerSession(authOptions);