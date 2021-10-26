const Contacts = require("../repository/contacts");
const { HttpCode } = require("../config/constants");
const { CustomError } = require("../helpers/customError");

const getContacts = async (req, res, next) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({ status: "success", code: HttpCode.OK, data: { ...data } });
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }

  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

const saveContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
};

const removeContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

const updateStatusContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

module.exports = {
  getContacts,
  getContact,
  saveContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
