const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ValidInfoContact } = require("../../config/constants");

const patternPhone = /^\+[0-9]{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}/;

const schemaContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(ValidInfoContact.MIN_NAME)
    .max(ValidInfoContact.MAX_NAME)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  isFavorite: Joi.boolean().optional(),
});

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const schemaId = Joi.object({
  contactId: Joi.objectId().required(),
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

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
