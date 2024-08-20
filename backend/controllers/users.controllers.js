const SignupUsers = require("../models/signup.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createToken(id) {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "1d" });
}

async function signupUser(req, res) {
  const { name, username, email, password } = req.body;
  try {
    const user = await SignupUsers.signup(name, username, email, password);
    const token = createToken(user._id);

    res.status(201).json({ user, access_token: token, user_id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await SignupUsers.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      throw Error("Account not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect Password");
    }
    const token = createToken(user._id);
    res.status(200).json({ user, access_token: token, user_id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signupUser, loginUser };
