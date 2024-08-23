import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/slices/transactionsSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

function TransactionForm() {
    const [transaction, setTransaction] = useState({
        description: '',
        amount: '',
        type: '',
        category: '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transaction.description && transaction.amount && transaction.category) {
            dispatch(addTransaction({ ...transaction, id: Date.now(), amount: Number(transaction.amount) }));
            setTransaction({ description: '', amount: '', type: 'expense', category: '' });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                name="description"
                label="Description"
                value={transaction.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="amount"
                label="Amount"
                type="number"
                value={transaction.amount}
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
                    value={transaction.type}
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
                value={transaction.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Transaction
            </Button>
        </Box>
    );
}

export default TransactionForm;