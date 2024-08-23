import { List } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTransaction, updateTransaction } from '../store/slices/transactionsSlice'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import EditTransactionForm from './EditTransactionForm';

function TransactionList() {
    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
    };

    const handleCloseEdit = () => {
        setEditingTransaction(null);
    };

    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom>
                Transaction List
            </Typography>
            <List>
                {transactions.map((transaction) => (
                    <ListItem key={transaction.id}>
                        <ListItemText
                            primary={transaction.description}
                            secondary={`${transaction.type}: ₹${transaction.amount}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(transaction)} sx={{ mr: 1 }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTransaction(transaction.id))}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            {editingTransaction && (
                <EditTransactionForm
                    transaction={editingTransaction}
                    open={Boolean(editingTransaction)}
                    onClose={handleCloseEdit}
                />
            )}
        </>
    )
}

export default TransactionList