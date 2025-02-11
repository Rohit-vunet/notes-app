import { ChangeEvent, useState } from "react";
import { Box, InputBase, Button, styled, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";

import { NoteObject } from "../modals/modals";
import { TITLE_LIMIT, TEXT_LIMIT } from "../Consants/Consants"; 

const Container = styled(Box)`
    & > * {
        margin-right: 20px !important;
        margin: 20px 0;
    }
    & > div > input[type="text"] {
        border-bottom: 1px solid #111111;
        opacity: 0.4;
        width: 300px;
        padding-right: 25px;
    }
    & > div > input[type="color"] {
        position: relative;
        bottom: -10px;
        width: 40px;
        height: 30px;
    }
    & > span {
        font-size: 10px;
        position: relative;
        right: 40px;
    }
`;

const Error = styled(Typography)`
    background: red;
    color: #fff;
    padding: 10px;
    width: 50%;
`;

const defaultObj: NoteObject = {
    id: uuid(),
    title: "",
    text: "",
    color: "#F5F5F5",
    date: new Date().toLocaleString(),
};

interface ICreateNoteProps {
    addNote: (note: NoteObject) => void;
}

const CreateNote: React.FC<ICreateNoteProps> = ({ addNote }) => {
    const [note, setNote] = useState<NoteObject>(defaultObj);
    const [error, setError] = useState<string>("");

    const onValueChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (error) setError("");

        const { name, value, type } = e.target;
        
        setNote((prevNote) => ({
            ...prevNote,
            [name]: type === "color" ? value : value.trimStart(), 
        }));
    };

    

    const onCreateNote = () => {
        if (!note.title.trim() || !note.text.trim()) {
            setError("All fields are mandatory");
            return;
        }

        const newNote = { ...note, id: uuid() };
        addNote(newNote);
        setNote({ ...defaultObj, id: uuid() });
    };

    return (
        <Container>
            <InputBase
                name="title"
                value={note.title}
                onChange={onValueChange}
                placeholder="Title"
                inputProps={{ maxLength: TITLE_LIMIT }}
            />
            {/* // indicating how many characters the user has typed out of the allowed limit. */}
            <Box component="span">{note.title.length}/{TITLE_LIMIT}</Box>

            <InputBase
                name="text"
                value={note.text}
                onChange={onValueChange}
                placeholder="Details"
                inputProps={{ maxLength: TEXT_LIMIT }}
            />
            <Box component="span">{note.text.length}/{TEXT_LIMIT}</Box>

            <InputBase
                type="color"
                name="color"
                value={note.color}
                onChange={onValueChange}
            />

            <Button variant="outlined" onClick={onCreateNote}>
                Create
            </Button>

            {error && <Error>{error}</Error>}
        </Container>
    );
};

export default CreateNote;
