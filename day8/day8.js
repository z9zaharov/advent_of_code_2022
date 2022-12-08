/**
 * --- Day 8: Treetop Tree House ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, TreeHouse } from "../day8/day8.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let trees = new TreeHouse();
  let res = trees.countVisible(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let trees = new TreeHouse();
  let res = trees.getMaxScenicScore(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 