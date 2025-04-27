const { isArbitrage, determineStakes, decimalToAmerican } = require("./core");
const { getSports, getOdds, getBestOdds } = require("./odds");

var revenue = 0;

function filterOdds(odds) {
  return odds.filter((odd) => {
    const oddsList = Object.values(odd.best_odds).filter(
      (value) => typeof value === "number"
    );
    return isArbitrage(oddsList);
  });
}

function getStakesAndAmerican(odds) {
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
    const americanlist = decimalToAmerican(oddsList);
    for (let i = 0; i < americanlist.length; i++) {
      odd.best_odds[`stake_${namesList[i]}`] = stakesList[i];
      odd.best_odds[`American_${namesList[i]}`] = americanlist[i];
      revenue += stakesList[i];
    }
    odd.best_odds[`profitPercentage`] = stakesList[-1];
    revenue -= 100;
  });

  return odds;
}

async function prepareData() {
  const keys = await getSports();
  var odds = await getOdds(keys);
  var minOdds = getBestOdds(odds);
  console.log(minOdds);
  var filteredOdds = filterOdds(minOdds);
  console.log(filteredOdds);
  if (filteredOdds.length == 0) {
    return [];
  }
  var finalOdds = getStakesAndAmerican(filteredOdds);
  console.log(finalOdds);
  return finalOdds;
}

module.exports = { prepareData, revenue };
