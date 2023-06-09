// Get the button and popup elements
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");
const popupCard= document.getElementsByClassName("popup-card");
const buttons_div = document.getElementsByClassName("buttons_div");

function showPopUp(event, func) {
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";

  let hidePopUp = () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  }

  let cancelBtn = () => {
    const newBtn = document.createElement('button')
    newBtn.setAttribute('id', 'cancel-button')
    newBtn.innerHTML = 'Cancel'
    newBtn.addEventListener('click', hidePopUp)
    /* popup.appendChild(newBtn) */
    buttons_div[0].appendChild(newBtn)
    console.log(buttons_div[0])
  }

  func && !document.getElementById('cancel-button') && cancelBtn()

  closeBtn.addEventListener("click", function() {
    hidePopUp()
    func && func()
  });

}

// <div id="popup" style="display: none;">
//    <h2>Sign up or login to see details</h2>
//    <button id="close-btn">Ok</button>
// </div>
