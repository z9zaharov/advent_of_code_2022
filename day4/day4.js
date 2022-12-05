/**
 * --- Day 4: Camp Cleanup ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Cleanup } from "../day4/day4.functions.js";

function step1(input) {
  let data = parseInputData(input);

  var cleanup = new Cleanup();

  let res = cleanup.countOverlaps(data, cleanup.isOverlap);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  var cleanup = new Cleanup();

  let res = cleanup.countOverlaps(data, cleanup.isOverlapAny);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 