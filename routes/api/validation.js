const Joi = require("joi");

const patternPhone = /^\+[0-9]{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}/;

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(1).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  isFavorite: Joi.boolean().optional(),
});

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const patternID = "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}";

const schemaId = Joi.object({
  contactId: Joi.string().pattern(new RegExp(patternID)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err);
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
