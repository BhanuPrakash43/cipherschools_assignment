const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

signupSchema.statics.signup = async function (name, username, email, password) {
  if (!name || !username || !email || !password) {
    throw Error("All fields are required.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email Address");
  }
  if (password.length < 8) {
    throw Error("Password should be at least 8 characters long");
  }

  const foundEmail = await this.findOne({ email });
  if (foundEmail) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    username,
    email,
    password: hashedPassword,
  });
  return user;
};

signupSchema.statics.login = async function (usernameOrEmail, password) {
  if (!usernameOrEmail || !password) {
    throw Error("All fields are required.");
  }

  // Find the user by either username or email
  const user = await this.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    throw Error("Account not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

const SignUpUser = mongoose.model("SignupUser", signupSchema);

module.exports = SignUpUser;
