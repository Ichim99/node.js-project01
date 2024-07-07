const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data));
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);

    if (contactById) {
      console.table(contactById);
      return contactById;
    } else {
      console.warn("\x1b[31m", "Contact with the specified ID not found");
      return null;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const removedContact = contacts.splice(contactIndex, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      console.table(removedContact);
      console.log(
        "\x1b[32m",
        "Contact",
        removedContact.name,
        "deleted successfully!"
      );

      return removedContact;
    } else {
      console.warn("\x1b[31m", "Contact with the specified ID not found");
      return null;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.table(newContact);
    console.log("\x1b[32m", "Contact", newContact.name, "added successfully!");

    return newContact;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};