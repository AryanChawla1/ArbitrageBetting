const { isArbitrage, determineStakes } = require("../src/core");
const { prepareData, revenue } = require("../src/data");
const assert = require("assert");

// function for core asserts based on pass/fail
function coreTest(odds, stake, pass) {
  assert.strictEqual(isArbitrage(odds), pass, "isArbitrage failed");
  if (!pass) {
    return;
  }
  const stakes = determineStakes(odds, stake);
  var sum = 0;
  for (const s of stakes) {
    sum += s;
  }
  assert.ok(Math.abs(sum - stake) < 0.1, "Stakes not correct");
}

console.log("Testing core");

coreTest([4.5, 4.0, 2.0], 100, true);
coreTest([2.1, 2.1], 50, true);
coreTest([2, 2], 100, false);
coreTest([1.9, 1.9], 100, false);
coreTest([2.1, 2], 30, true);
coreTest([4.0, 4.0, 2.0], 100, false);

(async () => {
  const ans = await prepareData();
  console.log(ans);
})();
