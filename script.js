let transactions = [];

function addTransaction(type, amount) {
  let transaction = {
    type: type,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  transactions.push(transaction);

  let list = document.getElementById("transactionList");
  list.innerHTML = "";

  // Display the newest transactions first
  for (let i = transactions.length - 1; i >= 0; i--) {
    let item = document.createElement("li");
    let current = transactions[i];

    item.textContent = current.type + ": -" +
      current.amount + " (" + current.date + ")";

    list.appendChild(item);
  }
}


document.getElementById("setupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the values entered by the student
  let swipes = Number(document.getElementById("startingSwipes").value);
  let dollars = Number(document.getElementById("startingDollars").value);

  // Update the dashboard
  document.getElementById("swipes").textContent = swipes;
  document.getElementById("dollars").textContent = "$" + dollars.toFixed(2);
});

document.getElementById("useSwipe").addEventListener("click", function () {
  let swipes = Number(document.getElementById("swipes").textContent);

  if (swipes > 0) {
    swipes--;
    document.getElementById("swipes").textContent = swipes;
    addTransaction("Meal Swipe", "1 swipe");
  } else {
    alert("You have no meal swipes remaining!");
  }
});


document.getElementById("purchaseForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the amount spent
  let amount = Number(document.getElementById("purchaseAmount").value);

  // Get the current Dining Dollar balance
  let dollars = Number(document.getElementById("dollars").textContent.replace("$", ""));

  if (amount <= 0) {
    alert("Please enter a valid amount.");
  } else if (amount > dollars) {
    alert("You do not have enough Dining Dollars!");
  } else {
    dollars -= amount;

    // Update the dashboard
    document.getElementById("dollars").textContent = "$" + dollars.toFixed(2);


    addTransaction("Dining Dollars", "$" + amount.toFixed(2));


    // Clear the input
    document.getElementById("purchaseAmount").value = "";
  }
});


