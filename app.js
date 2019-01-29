const fs = require('fs');
const notes = require('./notes.js');
const yargs = require('yargs');

const _ = require('lodash');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};


const argv = yargs
.command('add', 'Add a new note', {
  title:  titleOptions,
  body: bodyOptions

  }
)
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title: titleOptions
})
.command('remove', 'Remove a Note',{
  title: titleOptions
})
.help()
.argv;
var command = argv._[0];


if(command === 'add') {
  var note = notes.addNote;
  if (note.title === notes.addNote(argv.title, argv.body)) {
    console.log(`Note ${argv.title} already exists`)
  } else { console.log(`Note ${argv.title} ${argv.body} was created.`)}

} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`)
  allNotes.forEach((note) => notes.logNote(note));

} else if (command == 'read') {
  var note = notes.getNote(argv.title);
  if (note) {

console.log('Note Found');
debugger;
    notes.logNote(note);

  } else {

    console.log('note not found');
  }

 }
  else if (command == 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
