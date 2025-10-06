import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a user
 * @param {string} userId - MongoDB user ID
 * @returns {string} token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d" // token expires in 7 days
  });
};

export default generateToken;
