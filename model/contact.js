const { Schema, model } = require("mongoose");
const { ValidInfoContact } = require("../config/constant");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: ValidInfoContact.MIN_NAME,
      max: ValidInfoContact.MAX_NAME,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone for contact"],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

contactSchema.path("phone").validate(function (value) {
  const re = /^\+[0-9]{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}/;
  return re.test(String(value));
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
