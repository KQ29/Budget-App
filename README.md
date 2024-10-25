# 💰 Budget App with Chart 📊

This project is a sleek budget management application that lets you track your budget, add expenses by category, and visualize spending through a pie chart. Built with HTML, SCSS, and JavaScript, the app uses Chart.js for data visualization.

## 🌟 Features

- **💸 Set Total Budget**: Define and reset your overall budget.
- **📝 Add Expenses**: Input details like name, amount, and category to track each expense.
- **📈 Real-time Calculations**: Keeps your total expenses, remaining balance, and items list updated.
- **📊 Category-based Visualization**: Displays expenses by category in a pie chart for easy analysis.
- **📱 Responsive Design**: Gradient-themed, responsive, and interactive with hover and click effects.

## 📁 Folder Structure

- **`index.html`**: Main HTML file structuring the app layout.
- **`style.scss`**: SCSS file for styling, compiled into CSS for visual aesthetics.
- **`script.js`**: Handles budget tracking, validations, and DOM interactions.
- **`chart.js`**: Configures and updates the pie chart for expenses.

## 🚀 How to Use

1. **💰 Set Your Budget**:
   - Enter your total budget amount and click "Set Budget."
   - The balance and expenses will adjust automatically based on this amount.

2. **📤 Add Expenses**:
   - Input expense details (title, cost, and category) and click "Check Amount" to add it.
   - Each expense item appears in a list with edit ✏️ and delete 🗑️ options.

3. **📊 View Expense Chart**:
   - Click "Show Diagram" to toggle the pie chart, which shows your expenses by category.

## 🛠️ Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/budget-app.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd budget-app
    ```
3. **Open in Browser**:
   - Open `index.html` in your browser to launch the app.

## 🎨 SCSS Setup with Live Sass Compiler

To work with SCSS, you can use the **Live Sass Compiler** extension for real-time CSS updates.

1. **Install Live Sass Compiler**:
   - Install [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) in Visual Studio Code.

2. **Start Compiling**:
   - Open your project and click "Watch Sass" in the status bar to compile `style.scss` into `style.css` automatically.

## 📄 Code Breakdown

### 🔑 Key Files
- **`script.js`**: Handles all functionality for budget management, adding, editing, and deleting expenses.
- **`chart.js`**: Uses Chart.js to create and dynamically update the expense pie chart based on user data.

## 🧰 Dependencies

- **[Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css)**: For icons (edit, delete).
- **[Chart.js](https://cdn.jsdelivr.net/npm/chart.js)**: To visualize expenses by category in a pie chart.

## 🚀 Future Enhancements

- **💾 Data Persistence**: Save budget data with local storage or backend integration.
- **🔍 Advanced Filtering**: Enable filtering by category, date, or amount.
- **📊 Expense Insights**: Add summaries or trends for expense tracking over time.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository, make changes, and submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
