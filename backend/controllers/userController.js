// Importing required modules and dependencies
import userModel from "../models/userModel.js"; // Mongoose model for the user schema
import validator from "validator"; // Library for validating input (e.g., email, password)
import bcrypt from "bcrypt"; // Library for hashing passwords
import jwt from "jsonwebtoken"; // Library for creating and verifying JWT tokens

//! Helper function to generate a JWT token
function createToken(id) {
  // Creates a signed token with the user ID as payload and a secret key
  // The secret key is stored securely in the environment variables
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

//! signUp/register controller 🔐
// Function to handle user registration
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body; // Extract name, email, and password from the request body

    // Check if a user with the given email already exists in the database
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400) // Respond with a "Bad Request" status
        .json({ success: false, message: "Email already exists!" });
    }

    // Validate the email format using `validator`
    if (!validator.isEmail(email)) {
      return res
        .status(400) // Respond with a "Bad Request" status
        .json({ success: false, message: "Please provide a proper emailId" });
    }

    // Validate the password length (minimum 8 characters)
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hash the password using bcrypt for security
    const salt = await bcrypt.genSalt(10); // Generate a salt with cost factor 10
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create a new user object and save it in the database
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save(); // Save the user in the database

    // Generate a JWT token for the registered user
    const token = createToken(user._id); // Use the user's unique ID from MongoDB
    res.json({ success: true, token }); // Respond with the generated token
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! login controller 🔐
// Function to handle user login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body; // Extract email and password from the request body

    // Check if a user with the given email exists in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400) // Respond with a "Bad Request" status
        .json({ success: false, message: "User not found!" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400) // Respond with a "Bad Request" status
        .json({ success: false, message: "Incorrect password!" });
    } else {
      // Generate a JWT token for the user
      const token = createToken(user._id);
      res.json({ success: true, token }); // Respond with the token
    }
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! Admin login 🔑👨🏻‍💻
// Function to handle admin login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body; // Extract email and password from the request body

    // Check if the provided credentials match the admin credentials
    if (
      email === process.env.ADMIN_EMAIL && // Compare email with environment variable
      password === process.env.ADMIN_PASSWORD // Compare password with environment variable
    ) {
      // Generate a JWT token for the admin
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token }); // Respond with success and the token
    } else {
      // If credentials are invalid, respond with an error
      res.json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Exporting the functions for use in routes or other parts of the application
export { loginUser, registerUser, adminLogin };
