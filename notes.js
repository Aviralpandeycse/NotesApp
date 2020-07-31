const fs = require("fs");

function getNotes() {
  return "Your notes...";
}

function addNote(title, body) {
  const notesArr = loadNotes();
  const duplicateNotesArr = notesArr.filter((note) => note.title === title);
  if (duplicateNotesArr.length != 0) {
    console.log("Note title: '" + title + "' is taken!");
  } else {
    notesArr.push({
      title: title,
      body: body,
    });
    saveNotes(JSON.stringify(notesArr));
    console.log("New note added");
  }
}

function saveNotes(data) {
  fs.writeFileSync("notes.json", data);
}

function loadNotes() {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesString = notesBuffer.toString();
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

module.exports = {
  addNote: addNote,
  getNotes: getNotes,
};
