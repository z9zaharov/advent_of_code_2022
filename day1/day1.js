/**
 * --- Day 1: Calorie Counting ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Calories } from "../day1/day1.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let calories = new Calories();
  let res = calories.getMax(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let calories = new Calories();
  let res = calories.threeLargest(data);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 