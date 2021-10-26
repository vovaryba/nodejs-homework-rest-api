const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ValidInfoUser } = require("../../config/constants");

const schemaUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(ValidInfoUser.MIN_PASSWORD)
    .max(ValidInfoUser.MAX_PASSWORD)
    .required(),
  subscription: Joi.string(),
});

const schemaId = Joi.object({
  id: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateUser = async (req, res, next) => {
  return await validate(schemaUser, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
