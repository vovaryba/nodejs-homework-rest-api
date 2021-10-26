const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode } = require("../config/constants");
const { CustomError } = require("../helpers/customError");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  try {
    const newUser = await Users.create({ email, password, subscription });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user.isValidPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      token,
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  const user = await Users.findById(id);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ test: "test" });
};

const getCurrent = async (req, res, next) => {
  const id = req.user._id;
  const user = await Users.findById(id);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateUserSubscription = async (req, res, next) => {
  const id = req.user._id;
  const user = await Users.updateUser(req.params.id, req.body, id);
  if (user) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { user } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

module.exports = {
  registration,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
};
