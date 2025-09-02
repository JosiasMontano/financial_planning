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
}