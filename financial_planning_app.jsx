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
    
    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!description || !amount || !category) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const newTransaction = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            type,
            category,
            date: new Date().toLocaleDateString()
        };

        setTransactions([...transactions, newTransaction]);
        
        // Limpiar el formulario
        setDescription('');
        setAmount('');
        setCategory('');
    };

    // Eliminar una transacción
    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };
    
    // Obtener categorías para el tipo seleccionado
    const getCategories = () => {
        if (type === 'income') {
            return ['Salario', 'Freelance', 'Inversiones', 'Regalos', 'Otros'];
        } else {
            return ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Otros'];
        }
    };

    // Generar colores para el gráfico
    const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 137.5) % 360; // Distribución áurea de colores
            colors.push(`hsl(${hue}, 70%, 60%)`);
        }
        return colors;
    };
}
ReactDOM.render(<FinancialApp />, document.getElementById('root'));