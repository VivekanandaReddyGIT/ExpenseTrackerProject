//ACCESS DOM ELEMENTS FROM TYPESCRIPT

const expType = document.getElementById("expense-type")! as HTMLSelectElement;
const expDesc = document.getElementById("desc")! as HTMLInputElement;
const expAmt = document.getElementById("amount")! as HTMLInputElement;
const addExpBtn = document.querySelector(
  ".add-expense-btn"
)! as HTMLButtonElement;
const debitDiv = document.querySelector(
  ".expense-debit-item-container"
)! as HTMLDivElement;
const creditDiv = document.querySelector(
  ".expense-credit-item-container"
)! as HTMLDivElement;
const totalAmtDiv = document.querySelector(
  ".total-expense-amount"
)! as HTMLDivElement;

let expenseItems: Expense[] = [];

let totalAmount: number = 0;
class Expense {
  private static currentId: number = 0;
  readonly id: number = 0;
  type: "credit" | "debit" = "debit";
  description: string = "";
  amount: number = 0;

  constructor(type: "credit" | "debit", desc: string, amount: number) {
    this.type = type;
    this.description = desc;
    this.amount = amount;
    this.id = ++Expense.currentId;
  }
}

function DisplayExpenseItems() {
  debitDiv.innerHTML = "";
  creditDiv.innerHTML = "";
  for (let i = 0; i < expenseItems.length; i++) {
    let expItem = expenseItems[i];
    let containerDiv = expItem.type === "credit" ? creditDiv : debitDiv;
    let newElement = document.createElement("div");
    newElement.innerHTML = `<div class= "exp-desc">${expItem.description}</div>
        <div class="exp-amt">${expItem.amount}</div>
        <div class="exp-delete">
            <button class="delete-expense" onclick="deleteExpense(${expItem.id})">X</button>
        </div>`;
    let cssClass = expItem.type === "credit" ? "credit-item" : "debit-item";
    newElement.className = cssClass;
    containerDiv?.insertAdjacentElement("beforeend", newElement);
  }
}

function showTotal() {
  totalAmtDiv.textContent = totalAmount.toString();
}
addExpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let type: "credit" | "debit" =
    expType.value === "credit" ? "credit" : "debit";
  const exp = new Expense(type, expDesc.value, +expAmt.value);
  expenseItems.push(exp);

  DisplayExpenseItems();
  totalAmount = calculateTotal();
  showTotal();
});
function calculateTotal(): number {
  return expenseItems.reduce((total, expense) => {
    let amount = expense.amount;
    if (expense.type === "debit") {
      amount = -expense.amount;
    }
    total += amount;
    return total;
  }, 0);
}
function deleteExpense(id: number) {
  const exp: Expense = expenseItems.find((expense) => {
    return expense.id === id;
  }) as Expense;
  let index: number = expenseItems.indexOf(exp);
  expenseItems.splice(index, 1);
  DisplayExpenseItems();
  updateBalance(exp);
}
function updateBalance(expense: Expense) {
  let amount = expense.amount;
  if (expense.type === "credit") {
    totalAmount = totalAmount - amount;
  } else {
    totalAmount = totalAmount + amount;
  }
  showTotal();
}
