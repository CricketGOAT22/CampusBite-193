let transactions = [];


function addTransaction(type, amount) {
  let transaction = {
    type: type,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  transactions.push(transaction);
  displayTransactions();
}

document.getElementById("setupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the values entered by the student
  let swipes = Number(document.getElementById("startingSwipes").value);
  let dollars = Number(document.getElementById("startingDollars").value);


  let endDate = document.getElementById("endDate").value;

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let selectedDate = new Date(endDate + "T00:00:00");

  if (selectedDate < today) {
    alert("Please choose today or a future semester end date.");
    return;
  }


  // Update the dashboard
  document.getElementById("swipes").textContent = swipes;
  document.getElementById("dollars").textContent = "$" + dollars.toFixed(2);

  transactions = [];
  document.getElementById("transactionList").innerHTML = "";

  saveData();
  updateBudget();

});

document.getElementById("useSwipe").addEventListener("click", function () {
  let swipes = Number(document.getElementById("swipes").textContent);

  if (swipes > 0) {
    swipes--;
    document.getElementById("swipes").textContent = swipes;
    addTransaction("Meal Swipe", "1 swipe");
    saveData();
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
    saveData();
    updateBudget();


    // Clear the input
    document.getElementById("purchaseAmount").value = "";
  }
});


function saveData() {
  let data = {
    swipes: Number(document.getElementById("swipes").textContent),
    dollars: Number(document.getElementById("dollars").textContent.replace("$", "")),
    endDate: document.getElementById("endDate").value,
    transactions: transactions
  };

  localStorage.setItem("campusbiteData", JSON.stringify(data));
}


function loadData() {
  let savedData = localStorage.getItem("campusbiteData");

  if (savedData === null) {
    return;
  }

  let data = JSON.parse(savedData);

  // Restore balances and semester end date
  document.getElementById("swipes").textContent = data.swipes;
  document.getElementById("dollars").textContent =
    "$" + Number(data.dollars).toFixed(2);
  document.getElementById("endDate").value = data.endDate;

  // Restore transaction history
  transactions = data.transactions;
  displayTransactions();
  updateBudget();
}

loadData();


function updateBudget() {
  let dollars = Number(document.getElementById("dollars").textContent.replace("$", ""));
  let dateInput = document.getElementById("endDate").value;

  if (dateInput === "") {
    return;
  }

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let endDate = new Date(dateInput + "T00:00:00");

  let daysLeft = Math.round((endDate - today) / 86400000) + 1;

  if (daysLeft <= 0) {
    document.getElementById("budget").textContent = "$0.00";
    return;
  }

  let dailyBudget = dollars / daysLeft;

  document.getElementById("budget").textContent = "$" + dailyBudget.toFixed(2);
}


function displayTransactions() {
  let list = document.getElementById("transactionList");
  list.innerHTML = "";

  for (let i = transactions.length - 1; i >= 0; i--) {
    let item = document.createElement("li");
    let current = transactions[i];

    item.textContent = current.type + ": -" +
      current.amount + " (" + current.date + ")";

    list.appendChild(item);
  }
}






