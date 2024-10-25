const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('budgetAppDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create an object store for expenses with an auto-incrementing key
            if (!db.objectStoreNames.contains('expenses')) {
                db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
            }

            // Create an object store for the budget
            if (!db.objectStoreNames.contains('budget')) {
                db.createObjectStore('budget', { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
};

// Save budget to the database
const saveBudget = async (budget) => {
    const db = await openDatabase();
    const transaction = db.transaction('budget', 'readwrite');
    const store = transaction.objectStore('budget');
    await store.put({ id: 'total-budget', amount: budget });
};

// Get budget from the database
const getBudget = async () => {
    const db = await openDatabase();
    const transaction = db.transaction('budget', 'readonly');
    const store = transaction.objectStore('budget');
    const request = store.get('total-budget');
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result ? request.result.amount : 0);
        };
        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
};

// Save an expense to the database
const saveExpense = async (expense) => {
    const db = await openDatabase();
    const transaction = db.transaction('expenses', 'readwrite');
    const store = transaction.objectStore('expenses');
    await store.add(expense);
};

// Get all expenses from the database
const getExpenses = async () => {
    const db = await openDatabase();
    const transaction = db.transaction('expenses', 'readonly');
    const store = transaction.objectStore('expenses');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
};

// Delete an expense from the database
const deleteExpense = async (id) => {
    const db = await openDatabase();
    const transaction = db.transaction('expenses', 'readwrite');
    const store = transaction.objectStore('expenses');
    await store.delete(id);
};

// Clear all expenses from the database
const clearExpenses = async () => {
    const db = await openDatabase();
    const transaction = db.transaction('expenses', 'readwrite');
    const store = transaction.objectStore('expenses');
    await store.clear();
};

// Export functions for use in other files
export { saveBudget, getBudget, saveExpense, getExpenses, deleteExpense, clearExpenses };
// qsqqsqs