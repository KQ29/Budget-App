import { saveBudget, getBudget, saveExpense, getExpenses, deleteExpense } from './database.js';

// DOM elements for user inputs and display sections
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const categorySelect = document.getElementById("category-select");
const chartContainer = document.getElementById("chart-container");
const showDiagramButton = document.getElementById("show-diagram");

// Variables to store current budget and track editing
let tempAmount = 0;
let currentlyEditing = null;
let expenseItems = {}; 

// Generates a unique ID for each expense item
const generateID = () => '_' + Math.random().toString(36).substr(2, 9);

// Toggle chart visibility on button click
showDiagramButton.addEventListener("click", () => {
    chartContainer.classList.toggle('hide');
    showDiagramButton.innerText = chartContainer.classList.contains('hide') ? "Show Diagram" : "Hide Diagram";
});

// Chart initialization variable
let myPieChart;
const initializeChart = () => {
    const ctx = document.getElementById('expensesChart');
    if (ctx) {
        // Set up chart data structure with categories
        const expensesData = {
            labels: ['Food', 'Transport', 'Entertainment', 'Medical', 'Other'],
            datasets: [{
                label: 'Expenses by Category',
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        };
        myPieChart = new Chart(ctx, {
            type: 'pie',
            data: expensesData,
            options: { responsive: true }
        });
    } else {
        console.error("Chart element not found.");
    }
};

// Update chart data on expense addition or removal
const updateChart = (categoryIndex, amount, action) => {
    if (action === "add") {
        myPieChart.data.datasets[0].data[categoryIndex] += amount;
    } else if (action === "remove") {
        myPieChart.data.datasets[0].data[categoryIndex] -= amount;
    }
    myPieChart.update();
};

// Initialize budget and expenses on page load
window.addEventListener('load', async () => {
    initializeChart();
    // Load saved budget and display it
    tempAmount = await getBudget();
    amount.innerText = tempAmount.toFixed(2);
    balanceValue.innerText = tempAmount.toFixed(2);

    // Load saved expenses and display in the list and chart
    const expenses = await getExpenses();
    expenses.forEach(expense => {
        expenseItems[expense.id] = expense;
        listCreator(expense.id, expense.name, expense.amount, expense.categoryIndex);
        expenditureValue.innerText = (parseFloat(expenditureValue.innerText) + expense.amount).toFixed(2);
        balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
        updateChart(expense.categoryIndex, expense.amount, "add");
    });
});

// Set total budget amount and update balance
totalAmountButton.addEventListener("click", async () => {
    tempAmount = parseFloat(totalAmount.value);
    if (totalAmount.value === "" || tempAmount < 0) {
        // Show error if amount is invalid
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerHTML = tempAmount.toFixed(2);
        balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
        await saveBudget(tempAmount); // Save budget to database
        totalAmount.value = ""; // Clear input after saving
    }
});

// Create list entry for each expense item
const listCreator = (id, expenseName, expenseValue, categoryIndex) => {
    let subListContent = document.querySelector(`[data-id="${id}"]`);

    // Update existing item or create new if it doesn't exist
    if (subListContent) {
        subListContent.querySelector(".product").innerText = expenseName;
        subListContent.querySelector(".amount").innerText = parseFloat(expenseValue).toFixed(2);
    } else {
        subListContent = document.createElement("div");
        subListContent.classList.add("sublist-content", "flex-space");
        subListContent.setAttribute("data-id", id);
        subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${parseFloat(expenseValue).toFixed(2)}</p>`;
        list.appendChild(subListContent);

        // Add edit button with event listener
        let editButton = document.createElement("button");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        editButton.style.fontSize = "1.2em";
        editButton.addEventListener("click", () => modifyElement(id, true));

        // Add delete button with event listener
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
        deleteButton.style.fontSize = "1.2em";
        deleteButton.addEventListener("click", async () => {
            modifyElement(id, false);
            await deleteExpense(id); // Remove from database
            updateChart(categoryIndex, expenseValue, "remove"); // Update chart
        });

        subListContent.appendChild(editButton);
        subListContent.appendChild(deleteButton);
    }
};

// Modify or delete an expense item
const modifyElement = (id, edit = false) => {
    let expense = expenseItems[id];
    if (edit) {
        // Populate fields for editing
        productTitle.value = expense.name;
        userAmount.value = expense.amount;
        categorySelect.value = expense.categoryIndex;
        currentlyEditing = id;
    } else {
        // Update balance and remove from display
        expenditureValue.innerText = (parseFloat(expenditureValue.innerText) - expense.amount).toFixed(2);
        balanceValue.innerText = (parseFloat(balanceValue.innerText) + expense.amount).toFixed(2);

        let subListContent = document.querySelector(`[data-id="${id}"]`);
        subListContent.remove();

        delete expenseItems[id];
        currentlyEditing = null;
    }
};

// Add or edit an expense item
checkAmountButton.addEventListener("click", async () => {
    if (!userAmount.value || !productTitle.value) {
        // Show error if fields are empty
        productTitleError.classList.remove("hide");
        return false;
    }

    let expenditure = parseFloat(userAmount.value);
    let categoryIndex = parseInt(categorySelect.value);
    let id = currentlyEditing || generateID();

    if (currentlyEditing) {
        // Update chart to remove old value before updating
        updateChart(expenseItems[id].categoryIndex, expenseItems[id].amount, "remove");
        expenditureValue.innerText = (parseFloat(expenditureValue.innerText) - expenseItems[id].amount).toFixed(2);
        currentlyEditing = null;
    }

    // Create or update list item and save expense
    listCreator(id, productTitle.value, expenditure, categoryIndex);
    expenseItems[id] = { id, name: productTitle.value, amount: expenditure, categoryIndex };
    await saveExpense(expenseItems[id]);

    // Update expenditure and balance display
    expenditureValue.innerText = (parseFloat(expenditureValue.innerText) + expenditure).toFixed(2);
    balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);

    updateChart(categoryIndex, expenditure, "add"); // Update chart with new amount

    // Clear input fields
    productTitle.value = "";
    userAmount.value = "";
});
