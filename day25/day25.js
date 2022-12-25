/**
 * --- Day 25: Full of Hot Air ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Snafu } from "./day25.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let snafu = new Snafu();

 let res = snafu.toSnafu(snafu.getSum(data));

  return res;
}

function step2(input) {
  let data = parseInputData(input);
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
//console.log(step2(input)); 