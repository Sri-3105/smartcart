import { Router } from "express";
import { users } from "./data.js";

const userRouter = Router();

let userList = users;
let loginActivity = [];

// Replace these 4 values with your actual admin email addresses.
const ADMIN_EMAILS = [
  "admin@smartcart.com",
];
const normalizeEmail = (email = "") => email.trim().toLowerCase();

const getRoleForEmail = (email) => {
  return ADMIN_EMAILS.includes(normalizeEmail(email)) ? "admin" : "user";
};

// Hide password before sending user data to frontend
const safeUser = (user) => {
  if (!user) return null;

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Get user by ID
userRouter.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const user = userList.find((item) => item.id == userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User found",
    user: safeUser(user),
  });
});

// Get all users — passwords are not returned
userRouter.get("/user", (req, res) => {
  return res.status(200).json(userList.map(safeUser));
});

// Get successful login activity
userRouter.get("/login-activity", (req, res) => {
  return res.status(200).json(loginActivity);
});

// Create user — role is always user
userRouter.post("/user", (req, res) => {
  const data = req.body;
  const lastId = Math.max(0, ...userList.map((item) => Number(item.id) || 0));

  const newUser = {
    ...data,
    id: lastId + 1,
    role: "user",
  };

  userList.push(newUser);

  return res.status(201).json({
    message: "User created",
    user: safeUser(newUser),
  });
});

// Update user partially
userRouter.patch("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const user = userList.find((item) => item.id == userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Prevent role changes through this endpoint
  const { role, ...allowedUpdates } = data;

  const updatedUser = {
    ...user,
    ...allowedUpdates,
  };

  userList = userList.map((item) =>
    item.id == userId ? updatedUser : item
  );

  return res.status(200).json({
    message: "User updated successfully",
    updatedUser: safeUser(updatedUser),
  });
});

// Replace user data
userRouter.put("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const userIndex = userList.findIndex((item) => item.id == userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { role, ...allowedData } = data;

  const updatedUser = {
    ...allowedData,
    id: userList[userIndex].id,
    role: userList[userIndex].role || "user",
  };

  userList[userIndex] = updatedUser;

  return res.status(200).json({
    message: "User updated successfully",
    user: safeUser(updatedUser),
  });
});

// Delete user
userRouter.delete("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const user = userList.find((item) => item.id == userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  userList = userList.filter((item) => item.id != userId);

  return res.status(200).json({
    message: "User deleted successfully",
    user: safeUser(user),
  });
});

// Login — existing users only
userRouter.post("/login", (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const normalizedGmail = normalizeEmail(gmail);

  const existingUser = userList.find(
    (item) => normalizeEmail(item.gmail) === normalizedGmail
  );

  if (!existingUser) {
    return res.status(404).json({
      message: "Account not found. Please sign up first.",
    });
  }

  if (existingUser.password !== password) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  // Determine role using the admin email list
  const role = getRoleForEmail(normalizedGmail);

  // Keep the user's role consistent in memory
  existingUser.role = role;

  const loggedInUser = {
    ...existingUser,
    role,
  };

  // Record successful login
  loginActivity.unshift({
    id: Date.now(),
    userId: existingUser.id,
    name: existingUser.name || "",
    gmail: existingUser.gmail,
    role,
    loginTime: new Date().toISOString(),
    status: "Success",
  });

  return res.status(200).json({
    message: "Login Successful",
    user: safeUser(loggedInUser),
  });
});

// Signup — every newly registered account starts as user
userRouter.post("/signup", (req, res) => {
  const { name, gmail, password, phno, address } = req.body;

  if (!name || !gmail || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  const normalizedGmail = normalizeEmail(gmail);

  const existingUser = userList.find(
    (item) => normalizeEmail(item.gmail) === normalizedGmail
  );

  if (existingUser) {
    return res.status(409).json({
      message: "This email is already registered. Please login.",
    });
  }

  const lastId = Math.max(0, ...userList.map((item) => Number(item.id) || 0));

  const newUser = {
    id: lastId + 1,
    name: name.trim(),
    gmail: normalizedGmail,
    password,
    phno: phno || "",
    address: address || "",
    role: "user",
  };

  userList.push(newUser);

  return res.status(201).json({
    message: "Signup successful. Please login.",
    user: safeUser(newUser),
  });
});

export default userRouter;