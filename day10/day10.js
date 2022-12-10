/**
 * --- Day 10: Cathode-Ray Tube ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, CathodeRayTube } from "../day10/day10.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let tube = new CathodeRayTube();
  let res = tube.sumStrength(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let tube = new CathodeRayTube();
  let res = tube.display(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 