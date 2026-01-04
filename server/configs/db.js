import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(
            `${process.env.MONGODB_URI}/quickgpt`,
            {
                bufferCommands: false,
            }
        );

        isConnected = db.connections[0].readyState === 1;
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ DB Connection Failed:", error.message);
        throw error;
    }
};

export default connectDB;







// import mongoose from "mongoose"

// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected', () => console.log("Database Connected"))
//         await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export default connectDB