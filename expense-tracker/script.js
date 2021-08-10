const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form_heading = document.getElementById("form-heading");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const submit_btn = document.getElementById("submit-btn");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

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
    // console.log(transactions);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    form_heading.innerHTML = "Add new Transaction";
    submit_btn.innerHTML = "Add transaction";
    text.value = "";
    amount.value = "";
  }
}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  let text = transaction.text;
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount)}</span> 
  `;

  //   <button class="edit-btn" onclick="editTransaction(${transaction.id},${
  //     transaction.amount
  //   },'${text}')"><i class="fas fa-edit"></i></button>

  //   <button class="delete-btn" onclick="removeTransaction(${
  //     transaction.id
  //   })">x</button>

  const dltBtnElement = document.createElement("button");
  dltBtnElement.classList.add("delete-btn");
  dltBtnElement.addEventListener("click", function () {
    removeTransaction(transaction.id);
  });
  dltBtnElement.innerHTML = "x";
  item.appendChild(dltBtnElement);

  const editBtnElement = document.createElement("button");
  editBtnElement.classList.add("edit-btn");
  editBtnElement.addEventListener("click", function () {
    editTransaction(transaction);
  });
  editBtnElement.innerHTML = `<i class="fas fa-edit"></i>`;
  item.appendChild(editBtnElement);

  list.appendChild(item);
}

// Update the balance income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);

  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;

  //   console.log(expense);
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Edit transaction by ID
function editTransaction(transaction) {
  //   console.log(transaction);
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

// Update Local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
