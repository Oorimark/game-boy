// script.js
const socket = io();

// Watch for changes to the HTML file and reload the browser
socket.on("reload", () => {
  console.log("Reloading the browser...");
  location.reload();
});
