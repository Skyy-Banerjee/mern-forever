import userModel from "../models/userModel.js"; // Import the User model to interact with the users collection in MongoDB.

// Controller to add products to a user's cart
async function addToCart(req, res) {
  try {
    const { userId, itemId, size } = req.body; // Extract userId, itemId, and size from the request body.

    // Fetch the user document from the database using the provided userId.
    const userData = await userModel.findById(userId);

    // Access the cartData field of the user document.
    let cartData = await userData.cartData;

    // Check if the item already exists in the cart.
    if (cartData[itemId]) {
      // If the size exists for the item, increment the quantity.
      if (cartData[itemId][size]) {
        cartData[itemId][size] +=1;
      } else {
        // If the size does not exist, set its quantity to 1.
        cartData[itemId][size] = 1;
      }
    } else {
      // If the item does not exist, create a new entry for it.
      cartData[itemId] = {};
      cartData[itemId][size] = 1; // Set the initial quantity for the specified size.
    }

    // Update the user's cartData in the database.
    await userModel.findByIdAndUpdate(userId, { cartData });

    // Respond with success if the operation is completed.
    res.json({ success: true, message: "Added to cart!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes.
    res.json({ success: false, message: error.message }); // Respond with the error message if something goes wrong.
  }
}

// Controller to update products in a user's cart
async function updateCart(req, res) {
  try {
    const { userId, itemId, size, quantity } = req.body; // Extract userId, itemId, size, and the updated quantity from the request body.

    // Fetch the user document from the database using the provided userId.
    const userData = await userModel.findById(userId);

    // Access the cartData field of the user document.
    let cartData = await userData.cartData;

    // Update the quantity of the specified item and size in the cart.
    cartData[itemId][size] = quantity;

    // Save the updated cartData back to the database.
    await userModel.findByIdAndUpdate(userId, { cartData });

    // Respond with success if the operation is completed.
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes.
    res.json({ success: false, message: error.message }); // Respond with the error message if something goes wrong.
  }
}

// Controller to fetch a user's cart data
async function getUserCart(req, res) {
  try {
    const { userId } = req.body; // Extract userId from the request body.

    // Fetch the user document from the database using the provided userId.
    const userData = await userModel.findById(userId);

    // Access the cartData field of the user document.
    let cartData = await userData.cartData;

    // Respond with the cartData and success status.
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes.
    res.json({ success: false, message: error.message }); // Respond with the error message if something goes wrong.
  }
}

// Export the functions to be used in other parts of the application.
export { addToCart, updateCart, getUserCart };
