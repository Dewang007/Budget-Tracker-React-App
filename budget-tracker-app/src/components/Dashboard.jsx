import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const transactions = useSelector((state) => state.transactions)
    const expenseChartRef = useRef(null);
    const incomeChartRef = useRef(null);

    const totalIncome = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

    const balance = totalIncome - totalExpenses

    const expenseByCategory = transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount)
            return acc
        }, {})

    const incomeByCategory = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount)
            return acc
        }, {})

    const expenseChartData = {
        labels: Object.keys(expenseByCategory),
        datasets: [
            {
                data: Object.values(expenseByCategory),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                ],
            },
        ],
    };

    const incomeChartData = {
        labels: Object.keys(incomeByCategory),
        datasets: [
            {
                data: Object.values(incomeByCategory),
                backgroundColor: [
                    '#66FF99', '#FF99CC', '#99CCFF', '#FFCC99', '#CC99FF', '#99FFCC',
                ],
            },
        ],
    };

    useEffect(() => {
        if (expenseChartRef.current) {
            expenseChartRef.current.data = expenseChartData;
            expenseChartRef.current.update();
        }
        if (incomeChartRef.current) {
            incomeChartRef.current.data = incomeChartData;
            incomeChartRef.current.update();
        }
    }, [transactions]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Total Income
                    </Typography>
                    <Typography variant="h4">₹{totalIncome.toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">Total Expenses</Typography>
                    <Typography variant="h4">₹{totalExpenses.toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">Balance</Typography>
                    <Typography variant="h4">₹{balance.toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">Expenses by Category</Typography>
                    <Box sx={{ height: 300 }}>
                        {Object.keys(expenseByCategory).length > 0 ? (
                            <Pie
                                data={expenseChartData}
                                ref={(element) => {
                                    if (element) {
                                        expenseChartRef.current = element.chartInstance;
                                    }
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        ) : (
                            <Typography>No expense data available</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">Income by Category</Typography>
                    <Box sx={{ height: 300 }}>
                        {Object.keys(incomeByCategory).length > 0 ? (
                            <Pie
                                data={incomeChartData}
                                ref={(element) => {
                                    if (element) {
                                        incomeChartRef.current = element.chartInstance;
                                    }
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        ) : (
                            <Typography>No income data available</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Dashboard