import mongoose from "mongoose";

const mongoConnect = async() => {
    try {
        mongoose.connection.on('connected', () => console.log("Connected to mongoDB atlas!"));  
        await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`);
    } catch (error) {
        console.log(error);
    }
}

export default mongoConnect;