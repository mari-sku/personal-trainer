import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import type { TrainingForm } from "../types/training";
import { saveTraining } from '../api/trainingApi'; 

// MUI components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type AddTrainingProps = {
    fetchTrainings: () => void;
    customerUrl: string; // pass the url of the customer
}

export default function AddTraining({ fetchTrainings, customerUrl }: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TrainingForm>({
        date: dayjs().format("YYYY-MM-DDTHH:mm"),
        duration: 60,
        activity: "",
        customer: customerUrl
    });

    useEffect(() => {
        setTraining(prev => ({ ...prev, customer: customerUrl }));
    }, [customerUrl]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: dayjs().format("YYYY-MM-DDTHH:mm"),
            duration: 60,
            activity: "",
            customer: customerUrl
        });
    };

    const handleSave = () => {
        if (!training.activity || !training.date) {
            alert("Please fill in all required fields!");
            return;
        }

        saveTraining(training)
            .then(() => {
                fetchTrainings(); // refresh trainings
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Add Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        required
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Date & Time"
                        type="datetime-local"
                        value={training.date}
                        onChange={e => setTraining({ ...training, date: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Duration (minutes)"
                        type="number"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: Number(e.target.value) })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
