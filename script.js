// Получаем элементы
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

let tempAmount = 0;
let currentlyEditing = null;
let expenseItems = {};  // Хранилище для всех расходов с ID

// Генератор уникальных ID
const generateID = () => '_' + Math.random().toString(36).substr(2, 9);

// Обработчик нажатия на кнопку "Show Diagram"
showDiagramButton.addEventListener("click", () => {
    if (chartContainer.classList.contains('hide')) {
        chartContainer.classList.remove('hide');
        chartContainer.classList.add('show');
        showDiagramButton.innerText = "Hide Diagram";
    } else {
        chartContainer.classList.remove('show');
        chartContainer.classList.add('hide');
        showDiagramButton.innerText = "Show Diagram";
    }
});

// Функция установки бюджета
totalAmountButton.addEventListener("click", () => {
    tempAmount = parseFloat(totalAmount.value);
    if (totalAmount.value === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerHTML = tempAmount.toFixed(2);
        balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
        totalAmount.value = "";
    }
});

// Функция для создания списка расходов
const listCreator = (id, expenseName, expenseValue, categoryIndex) => {
    let subListContent = document.querySelector(`[data-id="${id}"]`);

    // Если элемент уже существует, обновляем его
    if (subListContent) {
        subListContent.querySelector(".product").innerText = expenseName;
        subListContent.querySelector(".amount").innerText = parseFloat(expenseValue).toFixed(2);
    } else {
        // Если элемента нет, создаем его
        subListContent = document.createElement("div");
        subListContent.classList.add("sublist-content", "flex-space");
        subListContent.setAttribute("data-id", id); // Присваиваем уникальный ID
        subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${parseFloat(expenseValue).toFixed(2)}</p>`;
        list.appendChild(subListContent);

        let editButton = document.createElement("button");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        editButton.style.fontSize = "1.2em";
        editButton.addEventListener("click", () => {
            modifyElement(id, true);
        });

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
        deleteButton.style.fontSize = "1.2em";
        deleteButton.addEventListener("click", () => {
            modifyElement(id, false);
        });

        subListContent.appendChild(editButton);
        subListContent.appendChild(deleteButton);
    }

    // Обновляем диаграмму через `chart.js`
    updateChart(id, parseFloat(expenseValue), categoryIndex, "add");
};

// Функция для удаления или редактирования элемента
const modifyElement = (id, edit = false) => {
    let expense = expenseItems[id];
    let currentBalance = parseFloat(balanceValue.innerText);
    let currentExpense = parseFloat(expenditureValue.innerText);

    if (edit) {
        productTitle.value = expense.name;
        userAmount.value = expense.amount;
        categorySelect.value = expense.categoryIndex;
        currentlyEditing = id;
        disableButtons(true);
    } else {
        balanceValue.innerText = (currentBalance + expense.amount).toFixed(2);
        expenditureValue.innerText = (currentExpense - expense.amount).toFixed(2);

        // Обновляем диаграмму при удалении через `chart.js`
        updateChart(id, expense.amount, expense.categoryIndex, "remove");

        let subListContent = document.querySelector(`[data-id="${id}"]`);
        subListContent.remove();

        delete expenseItems[id]; // Удаляем из хранилища
        currentlyEditing = null;
    }
};

// Функция отключения кнопок редактирования и удаления
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Функция добавления расходов
checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }

    disableButtons(false);

    let expenditure = parseFloat(userAmount.value);
    let categoryIndex = categorySelect.value;
    let id = currentlyEditing || generateID(); // Если редактируем, то используем существующий ID

    // Если редактируем элемент, удаляем старое значение из диаграммы
    if (currentlyEditing) {
        updateChart(id, expenseItems[id].amount, expenseItems[id].categoryIndex, "remove");
        expenditureValue.innerText = (parseFloat(expenditureValue.innerText) - expenseItems[id].amount).toFixed(2);
        currentlyEditing = null;
    }

    listCreator(id, productTitle.value, expenditure, categoryIndex);

    // Обновляем или добавляем новый элемент в хранилище
    expenseItems[id] = { name: productTitle.value, amount: expenditure, categoryIndex: categoryIndex };

    // Обновляем общие расходы и баланс
    expenditureValue.innerText = (parseFloat(expenditureValue.innerText) + expenditure).toFixed(2);
    balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);

    productTitle.value = "";
    userAmount.value = "";
});
