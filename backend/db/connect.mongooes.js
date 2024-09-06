import mongoose from "mongoose";
// import dotenv from "dotenv";
// const URI="mongodb+srv://anuragvig2:anuragvig2@cluster0.mhnnrdf.mongodb.net/cluster0?retryWrites=true&w=majority";
// const MONGO_URI='mongodb+srv://anuragvig2:anurag@cluster0.7duir.mongodb.net/'
const connectMongoDB=async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(process.env.MONGO_URI)
        console.log(`Mongo connected `);
        
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1);
        
    }
}
export default connectMongoDB;