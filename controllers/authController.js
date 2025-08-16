import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";

// Register new user
export const register = async (req, res) => {
  try {
      if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is required" });
  }

    const parsed = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) return res.status(400).json(
      { message: "User already exists",
    user: {
      _id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name
    } });

    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    const newUser = new User({
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET
    );

    res.status(201).json({ message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token, });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login user

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials, User does not exist" });
    }

    console.log("Parsed pass", password);
    console.log("User pass", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Result", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },      // payload containing user id
      process.env.JWT_SECRET    // secret key from environment variables
    );

    res.json({ message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token
     });
  } catch (error) {
    next(error);
  }
};
// export const login = async (req, res) => {
//   try {
//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: "Request body is required" });
//     }

//     const parsed = loginSchema.parse(req.body);

//     const user = await User.findOne({ email: parsed.email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });
//     console.log(parsed)
//     console.log(user)

//     // const hashedPassword = await bcrypt.hash(parsed.password.trim(), 10);
//     // console.log("Hashed pass", hashedPassword)
//     console.log("Parsed pass", parsed.password.trim())
//     console.log("User pass", user.password)

//     const isMatch = await bcrypt.compare(parsed.password, user.password);
//     console.log(isMatch)
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     console.log("LOG SUCCESFUL!!!!!!!!!!!!!")

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET
//     );

//     res.json({
//       message: "Login successful", 
//       token, 
//       user: { 
//         id: user._id, 
//         name: user.name, 
//         email: user.email, 
//         role: user.role 
//       } 
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
