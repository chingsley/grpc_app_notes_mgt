### DESCRIPTION

This is a grpc based server with nodejs. It is a mini project for notes management. A `note` has the following attributes:

- id
- title
- content

### HOW TO TEST

- clone the repo
- cd into the project root with `cd grpc_based_notes_server`
- run `npm install` to install the required depencies
- to get all notes, run `node getNotes.js`. This will log all notes to the terminal
- to add a new note, run `node insertNote.js`
- to delete a note, run `node deleteNote.js`
