const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const browserSync = require("browser-sync");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const bs = browserSync.create();

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // Send the HTML file
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Watch for changes to the HTML file and notify connected clients to reload
  socket.on("file-changed", () => {
    io.emit("reload");
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  bs.init({
    proxy: "http://localhost:3000",
    files: ["./public/**/*.*"], // Watch all files in the public directory
    online: false,
    open: false, // Prevent browser from opening automatically
  });

  // Watch for changes to notify the server
  bs.watch("./public/**/*.*").on("change", (event) => {
    io.emit("file-changed");
  });
});
