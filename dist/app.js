"use strict";
//ACCESS DOM ELEMENTS FROM TYPESCRIPT
const expType = document.getElementById("expense-type");
const expDesc = document.getElementById("desc");
const expAmt = document.getElementById("amount");
const addExpBtn = document.querySelector(".add-expense-btn");
const debitDiv = document.querySelector(".expense-debit-item-container");
const creditDiv = document.querySelector(".expense-credit-item-container");
const totalAmtDiv = document.querySelector(".total-expense-amount");
let expenseItems = [];
let totalAmount = 0;
class Expense {
    constructor(type, desc, amount) {
        this.id = 0;
        this.type = "debit";
        this.description = "";
        this.amount = 0;
        this.type = type;
        this.description = desc;
        this.amount = amount;
        this.id = ++Expense.currentId;
    }
}
Expense.currentId = 0;
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
        containerDiv === null || containerDiv === void 0 ? void 0 : containerDiv.insertAdjacentElement("beforeend", newElement);
    }
}
function showTotal() {
    totalAmtDiv.textContent = totalAmount.toString();
}
addExpBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let type = expType.value === "credit" ? "credit" : "debit";
    const exp = new Expense(type, expDesc.value, +expAmt.value);
    expenseItems.push(exp);
    DisplayExpenseItems();
    totalAmount = calculateTotal();
    showTotal();
});
function calculateTotal() {
    return expenseItems.reduce((total, expense) => {
        let amount = expense.amount;
        if (expense.type === "debit") {
            amount = -expense.amount;
        }
        total += amount;
        return total;
    }, 0);
}
function deleteExpense(id) {
    const exp = expenseItems.find((expense) => {
        return expense.id === id;
    });
    let index = expenseItems.indexOf(exp);
    expenseItems.splice(index, 1);
    DisplayExpenseItems();
    updateBalance(exp);
}
function updateBalance(expense) {
    let amount = expense.amount;
    if (expense.type === "credit") {
        totalAmount = totalAmount - amount;
    }
    else {
        totalAmount = totalAmount + amount;
    }
    showTotal();
}
