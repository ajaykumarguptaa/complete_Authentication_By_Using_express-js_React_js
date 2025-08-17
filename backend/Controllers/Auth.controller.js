import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    // user existence check
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const userModel = new User({
      name,
      email,
      password,
    });

    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    // user existence check
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ispasswordEqual = await bcrypt.compare(password, user.password);
    if (!ispasswordEqual) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: "Invalid password" });
    }
    // if user name and password is right then need to create a session or token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({
        message: "Login successful",
        jwtToken: jwtToken,
        name: user.name,
        email: user.email,
        _id: user._id,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

export { signUp, login };
