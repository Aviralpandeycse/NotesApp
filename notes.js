const fs = require("fs");
const chalk = require("chalk");

const readNote = (title) => {
  const notesArr = loadNotes();
  const note = notesArr.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(chalk.inverse(note.body));
  } else {
    console.log(chalk.red.inverse("Note with title " + title + " not found!"));
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
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
  const duplicateNote = notesArr.find((note) => note.title === title);
  if (duplicateNote) {
    console.log(
      chalk.red.inverse("Note title: '" + title + "' is already taken!")
    );
  } else {
    notesArr.push({
      title: title,
      body: body,
    });
    saveNotes(notesArr);
    console.log(chalk.green.inverse("New note added"));
  }
};

const removeNote = (title) => {
  const notesArr = loadNotes();
  const removedArr = notesArr.filter((note) => note.title !== title);
  if (notesArr.length > removedArr.length) {
    saveNotes(removedArr);
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
  readNote: readNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
