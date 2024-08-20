const jwt = require("jsonwebtoken");
const signupUsers = require("../models/signup.models");

async function requireAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token missing" });
  }

  const [bearerString, token] = authorization.split(" ");

  if (bearerString !== "Bearer") {
    return res.status(401).json({ error: "Bearer token missing" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await signupUsers.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "You are not authorized" });
  }
}

module.exports = requireAuth;
