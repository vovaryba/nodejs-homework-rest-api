const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  saveContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const {
  validateContact,
  validateStatusContact,
  validateId,
} = require("./validation");

router.get("/", getContacts);

router.get("/:contactId", validateId, getContact);

router.post("/", validateContact, saveContact);

router.delete("/:contactId", validateId, removeContact);

router.put("/:contactId", [validateId, validateContact], updateContact);

router.patch(
  "/:contactId/favorite",
  [validateId, validateStatusContact],
  updateStatusContact
);

module.exports = router;
