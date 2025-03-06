const express = require("express");
const { isArbitrage, determineStakes } = require("./core");
const { getSports, getOdds, getMinOdds } = require("./odds");
const port = 3000;

const app = express();

function filterOdds(odds) {
  return odds.filter((odd) => {
    const oddsList = Object.values(odd.lowest_odds);
    return isArbitrage(oddsList);
  });
}

app.listen(port, async () => {
  console.log(`Backend Listening on port ${port}`);
  const keys = await getSports();
  var odds = await getOdds(keys);
  var minOdds = getMinOdds(odds);
  console.log(minOdds);
  var filteredOdds = filterOdds(minOdds);
  console.log(filteredOdds);
});
