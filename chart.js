const ctx = document.getElementById('expensesChart').getContext('2d');
const expensesData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Medical', 'Other'], 
    datasets: [{
        label: 'Expenses by Category',
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
};


const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: expensesData,
    options: {
        responsive: true,
    }
});

const updateChart = (id, expenseValue, categoryIndex, action) => {
    if (action === "add") {
        myPieChart.data.datasets[0].data[categoryIndex] += expenseValue;
    } else if (action === "remove") {
        myPieChart.data.datasets[0].data[categoryIndex] -= expenseItems[id].amount;
    }
    myPieChart.update();
};
