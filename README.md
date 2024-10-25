# Budget App with Chart

This project is a budget management application that allows users to track their budget, add expenses with categories, and visualize spending using a pie chart. Built with HTML, CSS (SCSS), and JavaScript, it leverages Chart.js for data visualization.

## Features

- **Set Total Budget**: Allows users to define and reset the overall budget.
- **Add Expenses**: Users can input details like the expense name, amount, and category.
- **Expense Tracking**: Automatically updates total expenses, remaining balance, and individual items in the expense list.
- **Category-based Visualization**: Displays expenses in a pie chart, categorized for easy analysis.
- **Responsive and Interactive UI**: Includes effects on hover and click for an improved user experience.

## Folder Structure

- `index.html`: The main HTML file, structuring the app.
- `style.css`: CSS file for app styling (generated from SCSS).
- `script.js`: JavaScript handling the budget and expense logic.
- `chart.js`: JavaScript with Chart.js integration for creating and updating the pie chart.

## How to Use

1. **Set Your Budget**:
   - Enter the total budget amount and click "Set Budget."
   - The balance and expense values will adjust based on the input.

2. **Add Expenses**:
   - Input expense details: title, amount, and category.
   - Click "Check Amount" to add the expense to the list and update the chart.
   - Each expense displays with edit and delete options.

3. **View Expense Chart**:
   - Click "Show Diagram" to view expenses by category in a pie chart.
   - Click again to hide the chart.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/budget-app.git
    ```
2. **Navigate to the Directory**:
    ```bash
    cd budget-app
    ```
3. **Open the Project**:
   - Open `index.html` in your browser to launch the app.

## Code Breakdown

### Main Files
- **`script.js`**: Handles budget management, expense tracking, and item manipulation (edit/delete).
  - Functions include:
    - **`generateID()`**: Creates unique IDs for each expense.
    - **`listCreator()`**: Adds a new expense item to the list or updates an existing one.
    - **`modifyElement()`**: Edits or deletes an expense.
    - **`updateChart()`**: Updates the pie chart data when an expense is added, edited, or removed.
- **`chart.js`**: Uses Chart.js to manage the pie chart representing expenses.
  - **Pie Chart Setup**: Initializes with predefined categories (Food, Transport, Entertainment, Medical, Other).
  - **Dynamic Update**: Adjusts values based on user actions.

## Dependencies

- **[Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css)**: Icons for edit and delete buttons.
- **[Chart.js](https://cdn.jsdelivr.net/npm/chart.js)**: Visualizes expenses by category in a pie chart.

## Possible Future Enhancements

- **Local Storage**: Save budget and expense data between sessions.
- **Filtering and Sorting**: Allow users to filter expenses by date, category, or amount.
- **Expense Insights**: Include more detailed insights and recommendations.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
