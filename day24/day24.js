/**
 * --- Day 24: Blizzard Basin ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, BlizzardBasin } from "./day24.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let basin = new BlizzardBasin();
  
  let res = basin.getMinRoute(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let basin = new BlizzardBasin();
  
  let res = basin.getThreeRuns(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 