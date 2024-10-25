// database.js
const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("budgetAppDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains("expenses")) {
                db.createObjectStore("expenses", { keyPath: "id" });
            }

            if (!db.objectStoreNames.contains("budget")) {
                db.createObjectStore("budget", { keyPath: "id" });
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

const saveBudget = async (budget) => {
    const db = await openDatabase();
    const transaction = db.transaction("budget", "readwrite");
    const store = transaction.objectStore("budget");
    await store.put({ id: "total-budget", amount: budget });
};

const getBudget = async () => {
    const db = await openDatabase();
    const transaction = db.transaction("budget", "readonly");
    const store = transaction.objectStore("budget");
    const request = store.get("total-budget");

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result ? request.result.amount : 0);
        };
        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
};

const saveExpense = async (expense) => {
    const db = await openDatabase();
    const transaction = db.transaction("expenses", "readwrite");
    const store = transaction.objectStore("expenses");
    await store.put(expense);
};

const getExpenses = async () => {
    const db = await openDatabase();
    const transaction = db.transaction("expenses", "readonly");
    const store = transaction.objectStore("expenses");
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result || []);
        };
        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
};

const deleteExpense = async (id) => {
    const db = await openDatabase();
    const transaction = db.transaction("expenses", "readwrite");
    const store = transaction.objectStore("expenses");
    await store.delete(id);
};

export { saveBudget, getBudget, saveExpense, getExpenses, deleteExpense };
