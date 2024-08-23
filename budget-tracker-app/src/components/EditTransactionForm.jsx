import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../store/slices/transactionsSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function EditTransactionForm({ transaction, open, onClose }) {
    const [editedTransaction, setEditedTransaction] = useState(transaction);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTransaction(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTransaction({ ...editedTransaction, amount: Number(editedTransaction.amount) }));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        name="description"
                        label="Description"
                        value={editedTransaction.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="amount"
                        label="Amount"
                        type="number"
                        value={editedTransaction.amount}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            name="type"
                            value={editedTransaction.type}
                            onChange={handleChange}
                            label="Type"
                        >
                            <MenuItem value="" disabled>Choose your Transaction</MenuItem>
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="category"
                        label="Category"
                        value={editedTransaction.category}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditTransactionForm;
