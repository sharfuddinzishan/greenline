//
const newButtons = document.getElementById("current-seat");

function modalSection() {
  // console.log('Mehedi Hasan is the best man in bangladesh.')
  // step--1: hide the all section and
  const mainSection = document.getElementById("main-section");
  mainSection.classList.add("hidden");
  // step--2: Show the done section
  const doneSection = document.getElementById("modal");
  doneSection.classList.remove("hidden");
}

function modalHide() {
  const mainSection = document.getElementById("modal");
  mainSection.classList.add("hidden");
  const mainSections = document.getElementById("main-section");
  mainSections.classList.remove("hidden");
}

// apply button function
document
  .getElementById("delete-confirm")
  .addEventListener("keyup", function (event) {
    const text = event.target.value;
    const deleteButton = document.getElementById("apply-button");
    const totalText = document.getElementById("total").innerText;
    const total = parseInt(totalText);
    if (text === "NEW15") {
      const totalAfterDiscount = parseInt(total - (total * 15) / 100);
      document.getElementById("grand-total").innerText = totalAfterDiscount;
      deleteButton.removeAttribute("disabled");
    } else if (text === "Couple 20") {
      const totalAfterDiscount = parseInt(total - (total * 20) / 100);
      document.getElementById("grand-total").innerText = totalAfterDiscount;
      deleteButton.removeAttribute("disabled");
    } else {
      deleteButton.setAttribute("disabled", true);
    }
  });

document
  .getElementById("phone-number")
  .addEventListener("keyup", function (event) {
    const number = event.target.value;
    const deleteButtons = document.getElementById("next-button");
    if (number === number) {
      deleteButtons.removeAttribute("disabled");
    } else {
      deleteButtons.setAttribute("disabled", true);
    }
  });

// apply button hidden function
function applyButton() {
  const applyButtonSection = document.getElementById("apply-button");
  applyButtonSection.classList.add("hidden");
}

const buttons = document.getElementsByClassName("clickbtn");
const selectedSeats = {};
for (let button of buttons) {
  button.addEventListener("click", function (e) {
    const newButtonsText = newButtons.innerText;
    const newSeats = parseInt(newButtonsText);
    if (newSeats >= 4) {
      if (selectedSeats[e.target.id]) {
        removeSeat(e, newSeats);
        selectedSeats[e.target.id] = false; // Mark seat as not booked
        toggleSeatButton(e);
      } else {
        alert("You can book only four seats");
      }
    } else {
      toggleSeatButton(e);
      // Check seat already booked
      if (selectedSeats[e.target.id]) {
        removeSeat(e, newSeats);
        selectedSeats[e.target.id] = false; // Mark seat as not booked
      } else {
        addSeat(e, newSeats);
        selectedSeats[e.target.id] = true; // Mark seat as selected
      }
    }
  });
}

const toggleSeatButton = function (e) {
  var element = document.getElementById(e.target.id);
  element.classList.toggle("bg-[#1DD100]");
  element.classList.toggle("text-white");
};

const addSeat = function (e, seatOrderCount) {
  console.log("Added Seat");
  const newButtonValue = seatOrderCount + 1;
  newButtons.innerText = newButtonValue;

  const availableSeat = document.getElementById("available-seat");
  const availableSeatElement = availableSeat.innerText;
  const available = parseInt(availableSeatElement);
  const updateSeat = available - 1;
  addToSeatList(e, newButtonValue);
  availableSeat.innerText = updateSeat;
};

const removeSeat = function (e, seatOrderCount) {
  console.log("Remove Seat");
  const newButtonValue = seatOrderCount - 1;
  newButtons.innerText = newButtonValue;

  const availableSeat = document.getElementById("available-seat");
  const availableSeatElement = availableSeat.innerText;
  const available = parseInt(availableSeatElement);
  const updateSeat = available + 1;
  removeFromSeatList(e);
  availableSeat.innerText = updateSeat;
};

const addToSeatList = function (e, newButtonValue) {
  console.log("Seat Added To Table");
  const tbody = document.querySelector("tbody");
  const addNewRow = document.createElement("tr");
  addNewRow.id = `row-${e.target.id}`;
  addNewRow.innerHTML = `
    <td id="table-data" class="py-2">A${newButtonValue}</td>
    <td>Economy</td>
    <td class="singleSeatPrice text-right">550</td>
  `;
  tbody.appendChild(addNewRow);
  totalPrice();
};

const removeFromSeatList = function (e) {
  console.log("Seat Removed From Table");
  const rowToRemove = document.getElementById(`row-${e.target.id}`);
  rowToRemove.remove();
  totalPrice();
};

const totalPrice = function () {
  let total = 0;
  const tbody = document.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  for (let i = 0; i < rows.length; i++) {
    const getPrice = rows[i].querySelector(".singleSeatPrice");
    total += parseInt(getPrice.textContent);
  }
  document.getElementById("total").innerText = total;
  document.getElementById("grand-total").innerText = total;
};
