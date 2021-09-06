const fs = require("fs").promises;
const path = require("path");
const shortId = require("uuid");
const contacts = require("./db/contacts.json");
const contactsJSON = "db/contacts.json";
const contactsPath = path.join(__dirname, contactsJSON);

const contactsOperations = {
  async listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);
  },
  async getContactById(contactId) {
    const oneContact = contacts.find((contact) => contact.id === contactId);
    console.log(oneContact);
  },
  async removeContact(contactId) {
    const rmContact = contacts.findIndex((item) => item.id === contactId);
    if (rmContact === -1) null;
    contacts.splice(rmContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  },
  async addContact(name, email, phone) {
    const id = shortId.v4();
    const arg = { id, name, email, phone };
    const add = contacts.push(arg);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  },
};
module.exports = contactsOperations;
