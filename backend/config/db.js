import mongoose from "mongoose";
const MONGO_URI='mongodb+srv://pstejaps:BB5LoS6NNaPc0KQh@cluster0.vwurcgm.mongodb.net/proshop?retryWrites=true&w=majority&appName=Cluster0'
const  connectDB= async () =>{
        try {
            const conn=await mongoose.connect(MONGO_URI);
            console.log(`Mongo DB connected ${conn.connection.host}`);
        }
        catch (e) {
            console.log(`Error ${e}`);
            process.exit(1);
        }
};
export default connectDB;
