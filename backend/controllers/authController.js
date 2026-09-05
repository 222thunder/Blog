const bycrypt = require("bcryptjs");
const userModel = require("../model/user");

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    req.session.isLoggedIn = true;
    req.session.userId = user._id.toString();
    req.session.save((err) => {
      if (err) {
        console.log("Error saving session:", err);
      }
      const userObj = user.toObject();
      delete userObj.password;
      res.status(200).json({ message: "Login successful", user: userObj });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

exports.postSignup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 12);
    const newUser = new userModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id.toString();
    req.session.save((err) => {
      if (err) console.log("Error saving session:", err);
      const userObj = newUser.toObject();
      delete userObj.password;
      res.status(201).json({ message: "User registered successfully", user: userObj });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMe = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const user = await userModel.findById(req.session.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


