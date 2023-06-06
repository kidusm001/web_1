// Get the button and popup elements
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");

// Add event listener to button to show the popup
function showPopUp() {
   popup.style.display = "flex";
   // Disable all other elements
   document.body.style.overflow = "hidden";
}

// Add event listener to close button to hide the popup
closeBtn.addEventListener("click", function() {
   popup.style.display = "none";
   // Re-enable all other elements
   document.body.style.overflow = "auto";
});

  // <div id="popup" style="display: none;">
  //    <h2>Sign up or login to see details</h2>
  //    <button id="close-btn">Ok</button>
  // </div>
