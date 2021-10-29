const express = require("express");
const router = express.Router();
const { HttpCode } = require("../../config/constants");
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
const guard = require("../../helpers/guard");
const role = require("../../helpers/role");
const wrapError = require("../../helpers/errorHandler");
const { Subscription } = require("../../config/constants");

router.get("/", guard, wrapError(getContacts));

router.get(
  "/test",
  guard,
  role(Subscription.STARTER),
  wrapError((req, res, next) => {
    res.json({
      status: "success",
      code: HttpCode.OK,
      data: { message: "Only for starter" },
    });
  })
);

router.get("/:contactId", guard, validateId, wrapError(getContact));

router.post("/", guard, validateContact, wrapError(saveContact));

router.delete("/:contactId", guard, validateId, wrapError(removeContact));

router.put(
  "/:contactId",
  guard,
  [validateId, validateContact],
  wrapError(updateContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  [validateId, validateStatusContact],
  wrapError(updateStatusContact)
);

module.exports = router;
