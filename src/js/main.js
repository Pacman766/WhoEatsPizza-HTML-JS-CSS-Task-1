// <------ Get elements ------>

var button = document.getElementById("load-btn");
var app = document.getElementById("app");

// <------ Create new elements ------>

var numCame = document.createElement("div");
var pizzasEat = document.createElement("div");
var guests = document.createElement("h3");
var guestsEatPizza = document.createElement("h3");
var waiting = document.createElement("h4");
var countGuests = 0;
var countPizzas = 0;
var circle = document.createElement("ul");
var divOne = document.createElement("div");
var divTwo = document.createElement("div");

// <------ Set elements and classes ------>

app.appendChild(waiting);
app.appendChild(divOne);
app.appendChild(divTwo);
divOne.className = "divOne";
divTwo.className = "divTwo";
button.className = "";


function getGuests(countGuests, countPizzas) {
  guests.innerHTML = "How many people came to the party: " + countGuests;
  guestsEatPizza.innerHTML = "How many people eat pizza: " + countPizzas;
}
getGuests(countGuests, countPizzas);

function getData(data) {
  circle.className = "circle";
  divOne.appendChild(guests);
  divOne.appendChild(numCame);
  divTwo.appendChild(guestsEatPizza);
  divTwo.appendChild(pizzasEat);
  for (let dataIndex = 0; dataIndex < data.length; ++dataIndex) {
    const cameToTheParty = document.createElement("p");
    numCame.appendChild(cameToTheParty);
    if (data[dataIndex].eatsPizza === true) {
      const li = document.createElement("p");
      pizzasEat.appendChild(li);
      li.appendChild(document.createTextNode(data[dataIndex].name));
      countPizzas += 1;
    }
    cameToTheParty.appendChild(document.createTextNode(data[dataIndex].name));
    countGuests += 1;
  }
  getLoading();
  getLiCircle(countPizzas);
  return app;
}

function getLoading() {
  button.className = "";
  waiting.innerHTML = "";
  getGuests(countGuests, countPizzas);
}

function load() {
  waiting.innerHTML = "waiting...";
  button.className = "loading";
  countGuests = 0;
  countPizzas = 0;
}

function getLiCircle(countPizzas) {
  var visitors = countPizzas;
  var skewYValue = 0;
  if (visitors > 4 && visitors < 8) {
    skewYValue = -30;
  } else if (visitors > 6 && visitors < 12) {
    skewYValue = -45;
  } else if (visitors > 10) {
    skewYValue = -60;
  }
  var degrees = 360 / visitors;
  var countLi = 0;
  for (let i = 0; i < visitors; ++i) {
    const liCircle = document.createElement("li");
    liCircle.style.transform =
      "rotate(" + countLi + "deg) skewY(" + skewYValue + "deg)";
    countLi += degrees;
    circle.appendChild(liCircle);
    var divText = document.createElement("div");
    divText.className = "text";
    divText.textContent = `${i + 1}`;
    liCircle.appendChild(divText);
  }
}
document.getElementById("load-btn").addEventListener("click", function() {
  if (
    circle &&
    pizzasEat &&
    numCame &&
    countGuests > 0 &&
    countPizzas > 0
  ) {
    guests.innerHTML = "";
    guestsEatPizza.innerHTML = "";
    pizzasEat.innerHTML = "";
    numCame.innerHTML = "";
    circle.innerHTML = "";
    circle.remove();
    countGuests = 0;
    countPizzas = 0;
  }
  load();
  fetch("https://gp-js-test.herokuapp.com/pizza")
    .then(response => response.json())
    .then(function(data) {
      setTimeout(() => {
        getGuests(countGuests, countPizzas);
        app.appendChild(circle);
        return getData(data.party);
      }, 1000);
    });
});