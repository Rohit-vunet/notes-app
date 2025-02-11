import { Box, Typography } from '@mui/material';
import { NoteObject } from "../modals/modals";
import Note from './Note';

interface INotesProps {
    notes: NoteObject[];
    deleteNote: (id: string) => void;
}

const Notes: React.FunctionComponent<INotesProps> = ({ notes, deleteNote }) => {
    return (
        <Box>
            <Typography variant="h5">Notes</Typography>
            <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                {notes.map((note) => (
                    <Note key={note.id} note={note} deleteNote={deleteNote} />
                ))}
            </Box>
        </Box>
    );
}

export default Notes;
