const button = document.getElementById("load-btn");
const app = document.getElementById("app");

const nCome = document.createElement("div");
const pizzasEat = document.createElement("div");
const guests = document.createElement("h3");
const guestsEatPizza = document.createElement("h3");
const waiting = document.createElement("h4");
const count = 0;
const amountPizzasEat = 0;
const circle = document.createElement("ul");
const divOne = document.createElement("div");
const divTwo = document.createElement("div");

app.appendChild(waiting);
app.appendChild(divOne);
app.appendChild(divTwo);
divOne.className = "div1";
divTwo.className = "div2";
button.className = "";