const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class CreateSenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.API_KEY_SENDGRID);
    return await sgMail.send({ ...msg, from: "Teplokrovniy@ex.ua" });
  }
}

module.exports = { CreateSenderSendGrid };
