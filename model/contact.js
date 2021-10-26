const { Schema, model, SchemaTypes } = require("mongoose");
const { ValidInfoContact } = require("../config/constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      min: ValidInfoContact.MIN_NAME,
      max: ValidInfoContact.MAX_NAME,
      required: [true, "Set name for contact"],
    },
    email: {
      type: SchemaTypes.String,
      unique: true,
      required: [true, "Set email for contact"],
      validate(value) {
        const re = /\S+@\S+.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    phone: {
      type: SchemaTypes.String,
      unique: true,
      required: [true, "Set phone for contact"],
    },
    isFavorite: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
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
  const re = /^\+[0-9]{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  return re.test(String(value));
});

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
