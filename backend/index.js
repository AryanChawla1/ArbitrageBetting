const express = require("express");
const { isArbitrage, determineStakes, decimalToAmerican } = require("./core");
const { getSports, getOdds, getBestOdds } = require("./odds");
const port = 3000;

const app = express();

function filterOdds(odds) {
  return odds.filter((odd) => {
    const oddsList = Object.values(odd.best_odds).filter(
      (value) => typeof value === "number"
    );
    return isArbitrage(oddsList);
  });
}

function getStakes(odds) {
  odds.forEach((odd) => {
    const entries = Object.entries(odd.best_odds);
    const oddsList = [];
    const namesList = [];

    entries.forEach(([key, value]) => {
      if (typeof value == "number") {
        oddsList.push(value);
        namesList.push(key);
      }
    });
    const stakesList = determineStakes(oddsList, 100);
    for (let i = 0; i < stakesList.length; i++) {
      odd.best_odds[`stake_${namesList[i]}`] = stakesList[i];
    }
  });

  return odds;
}

function addAmerican(odds) {
  odds.forEach((odd) => {
    const entries = Object.entries(odd.best_odds);
    const oddsList = [];
    const namesList = [];

    entries.forEach(([key, value]) => {
      if (typeof value == "number") {
        oddsList.push(value);
        namesList.push(key);
      }
    });
    const stakesList = decimalToAmerican(oddsList);
    for (let i = 0; i < stakesList.length; i++) {
      odd.best_odds[`American_${namesList[i]}`] = stakesList[i];
    }
  });

  return odds;
}

app.listen(port, async () => {
  console.log(`Backend Listening on port ${port}`);
  const keys = await getSports();
  var odds = await getOdds(keys);
  var minOdds = getBestOdds(odds);
  // console.log(minOdds);
  var filteredOdds = filterOdds(minOdds);
  console.log(filteredOdds);
  if (filteredOdds.length == 0) {
    return;
  }
  var stakedOdds = getStakes(filteredOdds);
  console.log(stakedOdds);
  var finalOdds = addAmerican(stakedOdds);
});
