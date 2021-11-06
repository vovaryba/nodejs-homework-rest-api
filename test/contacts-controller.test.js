const { updateContact } = require("../controllers/contacts");
const Contacts = require("../repository/contacts");
const { HttpCode } = require("../config/constants");
const { CustomError } = require("../helpers/customError");

jest.mock("../repository/contacts");

describe("Unit test controller updateContact", () => {
  let req, res, next;

  beforeEach(() => {
    Contacts.updateContact = jest.fn();
    req = { params: { contactId: 3 }, body: {}, user: { _id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

  it("Contact exist", async () => {
    const contact = {
      contactId: 3,
      name: "Vova",
      email: "vova@mail.com",
      phone: "+38(000)-000-00-00",
    };
    Contacts.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("code");
    expect(result).toHaveProperty("data");
    expect(result.data.contact).toEqual(contact);
  });

  it("Contact not exist v.1.0", async () => {
    await expect(updateContact(req, res, next)).rejects.toEqual(
      new CustomError(HttpCode.NOT_FOUND, "Not Found")
    );
  });

  it("Contact not exist v.1.1", () => {
    return updateContact(req, res, next).catch((e) => {
      expect(e.status).toEqual(HttpCode.NOT_FOUND);
      expect(e.message).toEqual("Not Found");
    });
  });
});
