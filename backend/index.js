const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const { prepareData } = require("./data");

const port = 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

function sendUpdates() {
  const data = { messge: "Hello from server!", timestamp: new Date() };

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

setInterval(sendUpdates, 5000);

// app.listen(port, async () => {
//   await prepareData();
// });

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
