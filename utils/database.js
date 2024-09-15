import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('mongodb is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 20000,
        });
        console.log('MongoDB connected successfully');
        isConnected = true;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}