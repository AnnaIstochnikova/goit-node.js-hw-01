const { program } = require('commander');
const argv = program.opts();

const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

program
  .option('-a, --action [string]', 'choose action')
  .option('-i, --id [string]', 'user id')
  .option('-n, --name [string]', 'user name')
  .option('-e, --email [string]', 'user email')
  .option('-p, --phone [number]', 'user phone');

program.parse(process.argv);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(data => console.log(data));
      break;

    case 'get':
      getContactById(id).then(searchResult => console.log(searchResult));
      break;

    case 'add':
      const uniqueId = 'id' + Math.random().toString(16).slice(2);
      addContact((id = uniqueId), name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
