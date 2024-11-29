import jwt from "jsonwebtoken"; // Importing the `jsonwebtoken` library to work with JWTs (JSON Web Tokens).

//! Middleware to authenticate admin users
async function adminAuth(req, res, next) {
  try {
    // Step 1: Extract the token from the request headers
    const { token } = req.headers; // Expecting the token to be sent in the `Authorization` header.
    if (!token) {
      // If no token is provided, return a 401 Unauthorized response.
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again!" });
    }

    // Step 2: Verify the token using `jsonwebtoken`
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    // `jwt.verify` checks if the token is valid by using the secret key stored in `process.env.JWT_SECRET`.
    // If invalid, it will throw an error (handled by the `catch` block).

    // Step 3: Compare the decoded token to admin credentials
    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      // If the decoded token data doesn't match the stored admin credentials, deny access.
      return res
        .status(403)
        .json({ success: false, message: "Invalid Token!" });
      // 403 Forbidden: Indicates that the user is authenticated but not allowed to access the resource.
    }

    // Step 4: Proceed to the next middleware/route handler if valid
    next(); // `next()` passes control to the next middleware or the actual route handler.
  } catch (error) {
    // Step 5: Handle any errors that occur during token verification
    console.error(error); // Log the error to the server console for debugging purposes.
    res.status(500).json({ success: false, message: error.message });
    // Return a 500 Internal Server Error response with the error message.
  }
}

export default adminAuth; // Export the middleware to use in other parts of the application.
