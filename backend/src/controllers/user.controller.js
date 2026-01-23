import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // basic validation

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    //check if user exist already
    const existing = await User.findOne({ email: email.toLowerCase() }); // mencek user dengan emali yang dilowercase
    if (existing) {
      return res.status(400).json({ message: "user already exist!" });
    }

    //create user

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //checking user sudah daftar atau belum
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: "User not found!",
      });

    //comparing password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "invalid credentials",
      });

    res.status(200).json({
      message: "Login Sucess",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(404).jso({
        message: "User not found!",
      });

    res.status(200).json({
      message: "Logout Sucess!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Status Error",
    });
  }
};

export { registerUser, loginUser, logoutUser };
