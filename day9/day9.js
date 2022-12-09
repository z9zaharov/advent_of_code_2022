/**
 * --- Day 9: Rope Bridge ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, RopeBridge } from "../day9/day9.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let ropeBridge = new RopeBridge();
  let res = ropeBridge.passRoute(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let ropeBridge = new RopeBridge();
  let res = ropeBridge.passLongRoute(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 