// Importing mongoose library to work with MongoDB
import mongoose from "mongoose";

// Defining the schema for a user collection in MongoDB
const userSchema = new mongoose.Schema(
  {
    // User's name: Must be a string and is required
    name: { type: String, required: true },

    // User's email: Must be a string, unique (no duplicate emails), and is required
    email: { type: String, required: true, unique: true },

    // User's password: Must be a string and is required
    password: { type: String, required: true },

    // User's cart data: Stored as an object and has a default value of an empty object
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // Ensures empty objects are not removed from the database
);

// Creating or using an existing model for the 'user' collection
// If the 'user' model already exists, use it; otherwise, create a new model using the schema
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Exporting the user model for use in other parts of the application
export default userModel;
