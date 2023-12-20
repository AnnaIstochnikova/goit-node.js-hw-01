import pkg from 'colors';
import { promises } from 'fs';
import path from 'path';
import readline from 'readline';

const { colors } = pkg;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const contactsPath = path.join(process.cwd(), 'db/contacts.json');

async function listContacts() {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    rl.close();
    return contacts;
  } catch (err) {
    return console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
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
    const data = await promises.readFile(contactsPath, 'utf-8');
    const allContacts = JSON.parse(data);
    const contactsAfterDelete = allContacts.filter(contact => contact.id !== contactId);
    try {
      await promises.writeFile(contactsPath, JSON.stringify(contactsAfterDelete));

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
    const data = await promises.readFile(contactsPath, 'utf-8');
    const allContacts = JSON.parse(data);
    const newContact = { id, name, email, phone };
    allContacts.push(newContact);

    try {
      await promises.writeFile(contactsPath, JSON.stringify(allContacts));
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

export { addContact, listContacts, removeContact, getContactById };
