const fs = require("fs");
const chalk = require("chalk");

function getNotes() {
  return "Your notes...";
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

function removeNote(title) {
  const notesArr = loadNotes();
  const removedArr = notesArr.filter((note) => note.title !== title);
  if (notesArr.length > removedArr.length) {
    saveNotes(JSON.stringify(removedArr));
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
}

module.exports = {
  addNote: addNote,
  getNotes: getNotes,
  removeNote: removeNote,
};
