// function to determine if arbitrage betting is possible
function isArbitrage(odds) {
  var sum = 0;
  for (const odd of odds) {
    sum += oddToProbability(odd);
  }
  return sum < 1;
}

// function to get the total probability of all events
function getProbability(odds) {
  var sum = 0;
  for (const odd of odds) {
    sum += oddToProbability(odd);
  }
  return sum;
}

// function to convert from decimal odds to probability
function oddToProbability(odd) {
  return 1 / odd;
}

// function to determine distribution of stake per event
function determineStakes(odds, stake) {
  const numOdds = odds.length;
  var stakes = new Array(numOdds);
  const totalProb = getProbability(odds);
  for (i = 0; i < odds.length; i++) {
    stakes[i] = (stake * oddToProbability(odds[i])) / totalProb;
  }
  return stakes;
}

function decimalToAmerican(decimalOddsList) {
  return decimalOddsList.map((odds) => {
    if (odds >= 2.0) {
      return Math.round((odds - 1) * 100);
    } else {
      return Math.round(-100 / (odds - 1));
    }
  });
}

module.exports = { isArbitrage, determineStakes, decimalToAmerican };
