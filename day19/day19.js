/**
 * --- Day 19: Not Enough Minerals ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Minerals } from "../day19/day19.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let minerals = new Minerals();

  let res = minerals.qualityCollect(data, 24);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let minerals = new Minerals();

  let res = minerals.firstThreeMultiply(data, 32);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 