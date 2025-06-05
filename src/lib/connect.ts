import mongoose from "mongoose";

const connectToDB = async() => {
    try {
        const mongoURI = `${process.env.MONGODB_URI}`
        if(!mongoURI){
            throw new Error("MONGO_URI environment variable is not defined");
        }
        //1 = already connected, or 2 = connecting
        if(mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) return
        await mongoose.connect(mongoURI)
    }
    catch(err){
        throw new Error("Failed to connect, try again later");
    }
}

export default connectToDB