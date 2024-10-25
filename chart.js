// Get 2D context for the chart canvas
const ctx = document.getElementById('expensesChart').getContext('2d');

// Initial chart data setup with expense categories and colors
const expensesData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Medical', 'Other'],  // Expense categories
    datasets: [{
        label: 'Expenses by Category',
        data: [0, 0, 0, 0, 0],  // Initial data set to zero for each category
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],  // Colors for each category
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']  // Colors on hover for visual feedback
    }]
};

// Create pie chart using Chart.js
const myPieChart = new Chart(ctx, {
    type: 'pie',  // Specify chart type as pie
    data: expensesData,  // Use defined data structure
    options: {
        responsive: true,  // Make chart responsive to screen size changes
    }
});

// Update chart data when an expense is added or removed
const updateChart = (id, expenseValue, categoryIndex, action) => {
    if (action === "add") {
        // Increase category data when an expense is added
        myPieChart.data.datasets[0].data[categoryIndex] += expenseValue;
    } else if (action === "remove") {
        // Decrease category data based on expense value when an expense is removed
        myPieChart.data.datasets[0].data[categoryIndex] -= expenseItems[id].amount;
    }
    myPieChart.update();  // Refresh chart with updated data
};
