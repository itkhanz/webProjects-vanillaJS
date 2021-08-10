## Expense Tracker

Keep track of income and expenses. Add and remove items and save to local storage

## Project Specifications

- Create UI for project
- Display transaction items in DOM
- Show balance, expense and income totals
- Add new transation and reflect in total
- Delete items from DOM
- Persist to local storage

---

## Project HTML

- As a naming convention, add a Class and ID attribute to the HTML tag with same name. Use the Class for CSS styling and ID for Javascript.

---

## Project CSS

- `min-height: 100vh;` allows the body to take the full height of viewport so body stays vertically centered because of flex properties.
- `flex: 1;` Equivalent to flex: 1 0px.
  - It makes the flex item flexible and sets the flex basis to zero, resulting in an item that receives the specified proportion of the remaining space.
  - If all items in the flex container use this pattern,
    their sizes will be proportional to the specified flex factor.
- ` display: inline-block;` allows to set margin and width properties on inline elements without addin a line break
- `.btn:focus;` The `:focus` pseudo class in CSS is used for styling an element
  that is currently targeted by the keyboard, or activated by the mouse.
- An `outline` is a line that is drawn around elements,
  outside the borders, to make the element "stand out". Remove the default outline on buttons in focus using `outline: 0;`
- Position a parent element as `relative` if you want to `absolute` position a child element.

---

## Project Javascript

Create variables to store references to DOM elements.

### Show Transaction Items

- Created a dummy transaction data to show list of transactions.
- Add tranactions to the DOM list:
    <details>
    <summary>Click to expand</summary>

  ```javascript
  // Add transactions to DOM list
  function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn">x</button>
      `;

    list.appendChild(item);
  }
  ```

    </details>

- Loop through the transactions to pass the transactions to addTransactionDOM, and initize the app.

---

### Display Balance, Income and Expense

- Calcuulate the balance, income, and expense using higher order array methods.
- Add the amount to the DOM.
    <details>
    <summary>Click to expand</summary>

  ```javascript
  // Update the balance income and expense
  function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);

    const expense =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -(1).toFixed(2);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`;

    //   console.log(expense);
  }
  ```

    </details>

---

### Add & Delete transactions

- Add an event listener to form, and write a function to handle the submission of input data as transaction.
- Add an extra check to see if the user input is empty.
- Create a transaction object, and pass it to the transactions array, and `addTransactionDOM`.
- Call the `updateValues()` to update the total balance, income and expense.
- Clear the User Inputs.
    <details>
        <summary>Click to expand</summary>

  ```javascript
  // Add trasnsaction
  function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
      alert("Please add a text and amount");
    } else {
      const transaction = {
        id: generateID(),
        text: text.value,
        amount: parseInt(amount.value),
      };

      transactions.push(transaction);
      addTransactionDOM(transaction);
      updateValues();

      text.value = "";
      amount.value = "";

      console.log(transactions);
    }
  }

  // Generate Random ID
  function generateID() {
    return Math.floor(Math.random() * 10000000);
  }
  ```

    </details>

- Add an inline `onclick` event to the `button` element and pass the transaction ID to `removeTransaction` function. Filter out the tranaction based on transactionID.

---

### Presist to Local Storage

- Implement the localStorage and use the data from it instead of dummy transactions.

```javascript
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
```

- Upate the localStorage:

```javascript
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
```

- Call the `updateLocalStorage()` function when add or delete the transaction.

---

### Edit transactions

- Add a seprate button element to the `<li>` transaction tags, and use fontawesome icon.
- Style the button to show on the left side, and move the delete button to the right.
- Refactor the code to not use inline HTML event attributes like `onClick`, makes difficult to pass strings and objects.

  ```javascript
  const editBtnElement = document.createElement("button");
  editBtnElement.classList.add("edit-btn");
  editBtnElement.addEventListener("click", function () {
    editTransaction(transaction);
  });
  editBtnElement.innerHTML = `<i class="fas fa-edit"></i>`;
  item.appendChild(editBtnElement);
  ```

- Pass the transaction to `editTransaction` function, and remove the to be edited transactions from the list and DOM.
- Insert the amount and text values inside the form fields, and modify the form headings.
- Submit the form to save the edited transaction changes.
    <details>
        <summary>Click to expand</summary>

  ```javascript
  // Edit transaction by ID
  function editTransaction(transaction) {
    //   First remove the transaction to be edited
    const transactionID = transaction.id;
    transactions = transactions.filter(
      (transaction) => transaction.id !== transactionID
    );
    //   removeTransactionDOM(transactionID);
    updateLocalStorage();
    init();

    form_heading.innerHTML = "Edit the transaction below: ";
    submit_btn.innerHTML = "Submit the edited transaction";

    //update the form fields
    text.value = transaction.text;
    amount.value = transaction.amount;
  }
  ```

    </details>

- Reset the form headings after submitting the edit changes inside `addTransaction`

---
