const { useState, useEffect } = React;

// Componente principal de la aplicación
function FinancialApp() {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('');

    // Cargar transacciones desde localStorage al iniciar
    useEffect(() => {
        const savedTransactions = localStorage.getItem('financialTransactions');
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        }
    }, []);

    // Guardar transacciones en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('financialTransactions', JSON.stringify(transactions));
    }, [transactions]);

    // Calcular el balance total
    const calculateBalance = () => {
        return transactions.reduce((total, transaction) => {
            return transaction.type === 'income' ? 
                total + parseFloat(transaction.amount) : 
                total - parseFloat(transaction.amount);
        }, 0);
    };

    // Calcular el total de ingresos
    const calculateIncome = () => {
        return transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    };

    // Calcular el total de gastos
    const calculateExpenses = () => {
        return transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    };
}