// Get the button and popup elements
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");

function showPopUp(event, func) {
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";

  closeBtn.addEventListener("click", function() {
     popup.style.display = "none";
     document.body.style.overflow = "auto";
     func && func()
  });

}

// <div id="popup" style="display: none;">
//    <h2>Sign up or login to see details</h2>
//    <button id="close-btn">Ok</button>
// </div>
