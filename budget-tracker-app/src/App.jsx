import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CssBaseline, Container, Typography } from '@mui/material';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Personal Budget Tracker
        </Typography>
        <Dashboard />
        <TransactionForm />
        <TransactionList />
      </Container>
    </Provider>
  );
}

export default App;