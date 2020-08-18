const grpc = require("grpc");
const { v4: uuidv4 } = require("uuid");
const notesProto = grpc.load("notes.proto");

const notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" },
];

const server = new grpc.Server();
server.addService(notesProto.NoteService.service, {
  list: (_, callback) => {
    callback(null, notes);
  },
  insert: (call, callback) => {
    const note = call.request;
    note.id = uuidv4();
    notes.push(note);
    callback(null, note);
  },
  delete: (call, callback) => {
    const noteIndex = notes.findIndex((note) => note.id == call.request.id);
    if (noteIndex > -1) {
      notes.splice(noteIndex, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: `no note matches the if of ${call.request.id}`,
      });
    }
  },
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();
