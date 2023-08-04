const fs = require("fs/promises");
const patch = require("path");
const { nanoid } = require("nanoid");
const contactPath = patch.join(__dirname, "contacts.json");

const updateContact = async (constacs) =>
  await fs.writeFile(contactPath, JSON.stringify(constacs, null, 2));

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContact(data);
  return result;
};

const addContact = async (name, email, phone) => {
  // Повертає об'єкт доданого контакту.
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateContact(data);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
