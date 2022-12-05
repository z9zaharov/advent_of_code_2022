/**
 * --- Day 3: Rucksack Reorganization ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Rucksack } from "../day3/day3.functions.js";

function step1(input) {
  let data = parseInputData(input);

  var rucksack = new Rucksack();

  let res = rucksack.sumPriorities(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  var rucksack = new Rucksack();

  let res = rucksack.sumPrioritiesInGroups(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 