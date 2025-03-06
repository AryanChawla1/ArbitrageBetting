const express = require("express");
const { isArbitrage, determineStakes } = require("./core");
const port = 3000;

const app = express();

app.listen(port, () => {
  console.log(`Backend Listening on port ${port}`);
});
