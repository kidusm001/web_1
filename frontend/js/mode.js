function changeMode() {
  // Get the current mode.
  var mode = localStorage.getItem("mode");

  // If the mode is "light", set it to "dark".
  if (mode === "light") {
    localStorage.setItem("mode", "dark");
  } else {
    // If the mode is "dark", set it to "light".
    localStorage.setItem("mode", "light");
  }

  // Update the UI.
  if (mode === "light") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
}