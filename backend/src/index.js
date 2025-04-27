const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const { prepareData, revenue } = require("./data");
const { retrieveEmails } = require("./supabase");
const { sendEmail } = require("./mail");

const port = 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();
var data = [];

let sample = require("../sample/bets.json");

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);
  ws.send(JSON.stringify(data));

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("error", (err) => {
    console.error(err);
  });
});

async function sendUpdates() {
  const data = await prepareData();
  if (data.length == 0) {
    console.log("No data found");
    return;
  }
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify(data));
        console.log(data);
      } catch (err) {
        console.error(err);
        clients.delete(client);
      }
    } else {
      clients.delete(client);
    }
  });
  const emails = await retrieveEmails();
  if (!emails) {
    console.error("No emails found");
    return;
  }
  console.log("Emails: ", emails);
  for (const email of emails) {
    sendEmail(
      email,
      "Arbitrage Betting",
      data
    );
  }
  console.log("Emails sent");
}

// 86400000 ms in a day
// 500 credits a month, with each request taking 3 sports, 2 regions, and 1 market.
// Each request is then 6 credits. So then its 500 / 6 = 83.33 requests a month.
// 83.33 / 30 = 2.77 requests a day. So then we can make 2 requests a day.
// So then the delay is 43200000 ms.
setInterval(sendUpdates, 4320000);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
