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
  } else {
    alert("You have no meal swipes remaining!");
  }
});

