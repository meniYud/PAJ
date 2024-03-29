import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log(`mongodb will connect ${process.env.MONGO_URI}`)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1)
    }
}

export default connectDB;