import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';


const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({ session }) {
            // Connect to DB if not already connected
            await connectToDB();
        
            // Find user by email
            const sessionUser = await User.findOne({ email: session.user.email });
        
            // Ensure sessionUser exists before accessing _id
            if (!sessionUser) {
                console.error("User not found in the database.");
                throw new Error("User not found.");
            }
        
            // Assign the user ID to the session object
            session.user.id = sessionUser._id.toString();
        
            return session; // Return the updated session object
        },
        
        async signIn({ profile }) {
            try {
                await connectToDB();
        
                // Check if the user exists
                const userExists = await User.findOne({ email: profile.email });
        
                // Create the user if not found
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
        
                return true; // Sign-in successful
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; // Sign-in failed
            }
        }
        
    
        }
    }
    
)

export {handler as GET,handler as POST};