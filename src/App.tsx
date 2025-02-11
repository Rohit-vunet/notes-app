import React, { useState, useEffect } from "react";

import { NoteObject } from "./modals/modals";

import Header from "./Components/Header";
import Notes from "./Components/Notes";
import CreateNote from "./Components/CreateNotes";

import { Box } from "@mui/material";

function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);

  useEffect(() => {
    const storedNotes = sessionStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]); 


  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addNote = (note: NoteObject) => {
    setNotes([note, ...notes]);
  };

  return (
    <>
      <Header />
      <Box style={{ padding: 20 }}>
        <CreateNote addNote={addNote} />
        <Notes notes={notes} deleteNote={deleteNote} />
      </Box>
    </>
  );
}

export default App;



