const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const { prepareData, revenue } = require("./data");

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

  ws.on("error", (err) => {
    console.error(err);
  })
});

async function sendUpdates() {
  const data = await prepareData();

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify(data));
        console.log(data)
      } catch (err) {
        console.error(err);
        clients.delete(client);
      }
    } else {
      clients.delete(client);
    }
  });
}

// 86400000 ms in a day
// 500 credits a month, with each request taking 3 sports, 2 regions, and 1 market.
// Each request is then 6 credits. So then its 500 / 6 = 83.33 requests a month.
// 83.33 / 30 = 2.77 requests a day. So then we can make 2 requests a day.
// So then the delay is 43200000 ms.
setInterval(sendUpdates, 43200000);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
