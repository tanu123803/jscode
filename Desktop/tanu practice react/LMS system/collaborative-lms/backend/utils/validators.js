// backend/utils/validators.js
export const validateSignup = ({ name, email, password, role }) => {
  if (!name || !email || !password || !role)
    return { error: "All fields are required" };
  if (password.length < 6)
    return { error: "Password must be at least 6 characters" };
  return {};
};

export const validateLogin = ({ email, password }) => {
  if (!email || !password) return { error: "Email and password required" };
  return {};
};
