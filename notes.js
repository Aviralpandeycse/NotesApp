const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes...";

const saveNotes = (data) => {
  fs.writeFileSync("notes.json", data);
};

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesString = notesBuffer.toString();
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const addNote = (title, body) => {
  const notesArr = loadNotes();
  const duplicateNotesArr = notesArr.filter((note) => note.title === title);
  if (duplicateNotesArr.length != 0) {
    console.log(chalk.red.inverse("Note title: '" + title + "' is taken!"));
  } else {
    notesArr.push({
      title: title,
      body: body,
    });
    saveNotes(JSON.stringify(notesArr));
    console.log(chalk.green.inverse("New note added"));
  }
};

const removeNote = (title) => {
  const notesArr = loadNotes();
  const removedArr = notesArr.filter((note) => note.title !== title);
  if (notesArr.length > removedArr.length) {
    saveNotes(JSON.stringify(removedArr));
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const listNotes = () => {
  const notesArr = loadNotes();
  console.log(chalk.inverse("Your notes!"));
  notesArr.forEach((note, index) => {
    console.log(chalk.green(index + 1 + ": " + note.title));
  });
};

module.exports = {
  addNote: addNote,
  getNotes: getNotes,
  removeNote: removeNote,
  listNotes: listNotes,
};
