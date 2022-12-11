/**
 * --- Day 11: Monkey in the Middle ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, MonkeyBusiness } from "../day11/day11.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let monkeyBusiness = new MonkeyBusiness();

  let res = monkeyBusiness.monkeyBusiness(data, 20);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let monkeyBusiness = new MonkeyBusiness();

  let res = monkeyBusiness.monkeyBusiness(data, 10000, 1);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 