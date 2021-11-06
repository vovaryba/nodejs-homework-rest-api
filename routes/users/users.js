const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");
const { validateUser, validateId } = require("./validation");
const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");

router.post("/registration", validateUser, wrapError(registration));
router.post("/login", validateUser, loginLimit, wrapError(login));
router.post("/logout", guard, wrapError(logout));
router.get("/current", guard, wrapError(getCurrent));
router.patch(
  "/:id/subscription",
  guard,
  validateId,
  wrapError(updateUserSubscription)
);
router.patch(
  "/avatar",
  guard,
  upload.single("avatar"),
  wrapError(uploadAvatar)
);

router.get("/verify/:token", wrapError(verifyUser));
router.post("/verify", repeatEmailForVerifyUser);

module.exports = router;
