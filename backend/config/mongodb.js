// Importing the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Asynchronous function to establish a connection to the MongoDB database
async function connectDB() {
  // Event listener: Logs a message when the database connection is successfully established
  mongoose.connection.on("connected", () => {
    console.log("DB Connected successfully✅🎉"); // Logs confirmation of successful connection
  });

  // Connect to MongoDB using the connection string stored in the .env file
  // Adding '/forever-mern' as the database name
  await mongoose.connect(`${process.env.MONGODB_URI}/forever-mern`);
}

// Exporting the connectDB function to use it in other parts of the application
export default connectDB;
