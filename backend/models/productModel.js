// Importing mongoose library to work with MongoDB
import mongoose from "mongoose";

// Defining the schema for a product collection in MongoDB
const productSchema = new mongoose.Schema({
  // Product name: Must be a string and is required
  name: { type: String, required: true },

  // Product description: Must be a string and is required
  description: { type: String, required: true },

  // Product price: Must be a number and is required
  price: { type: Number, required: true },

  // Product images: Stored as an array and is required
  image: { type: Array, required: true },

  // Main category of the product: Must be a string and is required
  category: { type: String, required: true },

  // Sub-category of the product: Must be a string and is required
  subCategory: { type: String, required: true },

  // Available sizes for the product: Stored as an array and is required
  sizes: { type: Array, required: true },

  // Bestseller status: A boolean indicating if the product is a bestseller
  bestseller: { type: Boolean, required: true },

  // Date of product creation or addition: Stored as a number (e.g., timestamp) and is required
  date: { type: Number, required: true },
});

// Creating or using an existing model for the 'product' collection
// If the 'product' model already exists, use it; otherwise, create a new model using the schema
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

// Exporting the product model for use in other parts of the application
export default productModel;
