// Import required modules and dependencies
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image upload
import productModel from "../models/productModel.js"; // Mongoose model for the product schema

//! addProduct Controller 🛒
// Function to handle adding a new product to the database
async function addProduct(req, res) {
  try {
    // Extract product details from the request body
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
      sizes,
    } = req.body;

    // Extract uploaded image files from the request
    const image1 = req.files.image1 && req.files.image1[0]; // First image
    const image2 = req.files.image2 && req.files.image2[0]; // Second image
    const image3 = req.files.image3 && req.files.image3[0]; // Third image
    const image4 = req.files.image4 && req.files.image4[0]; // Fourth image
    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined // Filter out undefined values (no image uploaded for that slot)
    );

    // Upload images to Cloudinary and get their secure URLs
    let imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image", // Specify the type of file being uploaded
        });
        return result.secure_url; // Return the URL of the uploaded image
      })
    );

    // Construct the product data object to save in the database
    const productData = {
      name,
      description,
      price: Number(price), // Convert price to a number
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false, // Convert bestseller to a boolean
      sizes: JSON.parse(sizes), // Parse sizes from JSON string to array/object
      image: imagesUrl, // Attach the uploaded image URLs
      date: Date.now(), // Add the current timestamp
    };

    console.log(productData); // Log product data for debugging purposes

    // Create a new product instance and save it to the database
    const product = new productModel(productData);
    await product.save();

    // Respond with success message
    res.json({ success: true, message: "Product added successfully✅" });
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! listProducts Controller 📃
// Function to list all products from the database
async function listProducts(req, res) {
  try {
    // Fetch all products from the database
    const products = await productModel.find({});
    res.json({ success: true, products }); // Respond with the list of products
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! removeProduct Controller ❌
// Function to remove a product by its ID
async function removeProduct(req, res) {
  try {
    // Find the product by ID and delete it
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully✅" }); // Respond with success message
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//! singleProductInfo Controller 🔍
// Function to fetch a single product's details by ID
async function singleProduct(req, res) {
  try {
    const { productId } = req.body; // Extract product ID from the request body

    // Find the product by its ID in the database
    const product = await productModel.findById(productId);
    res.json({ success: true, product }); // Respond with the product details
  } catch (error) {
    // Handle server-side errors and respond with appropriate status
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Export the controllers for use in routes or other parts of the application
export { addProduct, listProducts, removeProduct, singleProduct };
