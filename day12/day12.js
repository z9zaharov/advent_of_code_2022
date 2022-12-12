/**
 * --- Day 12: Hill Climbing Algorithm ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Hill } from "../day12/day12.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let hill = new Hill();

  let res = hill.countSteps(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let hill = new Hill();

  let res = hill.findBestRoute(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 