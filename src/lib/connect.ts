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
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err)
    }
}

export default connectToDB