/**
 * --- Day 14: Regolith Reservoir ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Regolith } from "../day14/day14.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let regolith = new Regolith();

  let res = regolith.fallToAbyss(data);

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
//console.log(step2(input)); 