// Get elements
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set Budget Functions
totalAmountButton.addEventListener("click", () => {
    tempAmount = parseFloat(totalAmount.value); // Use parseFloat for decimal handling
    // Bad input
    if (totalAmount.value === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Set budget
        amount.innerHTML = tempAmount.toFixed(2); // Keep two decimal places
        balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2); // Two decimal places
        // Clear input
        totalAmount.value = "";
    }
});

// Disable edit and delete button function
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Modify list elements function
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = parseFloat(balanceValue.innerText);
    let currentExpense = parseFloat(expenditureValue.innerText);
    let parentAmount = parseFloat(parentDiv.querySelector(".amount").innerText);

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount.toString();
        disableButtons(true);
    }

    balanceValue.innerText = (currentBalance + parentAmount).toFixed(2);
    expenditureValue.innerText = (currentExpense - parentAmount).toFixed(2);
    parentDiv.remove();
};

// Create list function
const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);

    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${parseFloat(expenseValue).toFixed(2)}</p>`;

    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });

    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

// Add expenses function
checkAmountButton.addEventListener("click", () => {
    // Check empty
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    // Enable buttons
    disableButtons(false);
    // Expense
    let expenditure = parseFloat(userAmount.value);
    // Total expense (existing + new)
    let sum = parseFloat(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum.toFixed(2);
    // Total balance = budget - total expense
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance.toFixed(2);
    // Create list
    listCreator(productTitle.value, userAmount.value);
    // Clear inputs
    productTitle.value = "";
    userAmount.value = "";
});
