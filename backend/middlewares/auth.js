import jwt from "jsonwebtoken";

async function authUser(req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Login Again!",
    });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
    console.log(error);
  }
}

export default authUser;
