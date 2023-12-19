const path = require('path');
const colors = require('colors');
const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    rl.close();
    return contacts;
  } catch (err) {
    return console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    rl.close();
    const { name, email, phone } = contacts.find(contact => contact.id === contactId);
    return ` name: ${name} \n email: ${email} \n phone: ${phone}`.cyan;
  } catch (err) {
    return console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const allContacts = JSON.parse(data);
    const contactsAfterDelete = allContacts.filter(contact => contact.id !== contactId);
    try {
      await fs.writeFile(contactsPath, JSON.stringify(contactsAfterDelete));

      contactsAfterDelete.length === allContacts.length
        ? console.log("Sorry, but there's no such contact.".bgRed)
        : console.log('Contact has been successfully deleted.'.bgGray);

      rl.close();
      return;
    } catch (err) {
      return console.log(err.message);
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(id, name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const allContacts = JSON.parse(data);
    const newContact = { id, name, email, phone };
    allContacts.push(newContact);

    try {
      await fs.writeFile(contactsPath, JSON.stringify(allContacts));
      console.log('New contact has been successfully added!'.bgGreen);
      rl.close();
      return;
    } catch (err) {
      return console.log(err.message);
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  addContact,
  listContacts,
  removeContact,
  getContactById,
};
