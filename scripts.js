// Get the modal
var modal = document.getElementById("appointment-modal");

// Get the button that opens the modal
var btns = document.getElementsByClassName("book-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission
var form = document.getElementById("appointment-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  // Process form data here (e.g., send to server)
  // Display success notification
  var notification = document.getElementById("notification");
  notification.style.display = "block";
  notification.textContent = "Appointment booked successfully!";
  // Hide notification after 3 seconds
  setTimeout(function() {
    notification.style.display = "none";
  }, 3000);
  // Close modal
  modal.style.display = "none";
});
