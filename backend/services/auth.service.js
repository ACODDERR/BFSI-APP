const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateToken = require("../utils/jwt");

const register = async (data) => {

  const { name, email, password } = data;

  const existingUser = await User.findOne({
    where: { email }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      email: user.email
    },
    token
  };

};



const login = async (data) => {

  const { email, password } = data;

  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      email: user.email
    },
    token
  };

};


module.exports = {
  register,
  login
};