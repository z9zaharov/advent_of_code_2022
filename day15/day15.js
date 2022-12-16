/**
 * --- Day 15: Beacon Exclusion Zone ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Beacon } from "../day15/day15.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let beacon = new Beacon();

  let res = beacon.countRowCoverage(data, 2000000)[0];

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let beacon = new Beacon();
  let res = beacon.getTuningFrequency(data, 0, 0, 4000000, 4000000);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 