/**
 * --- Day 7: No Space Left On Device ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, FileSystem } from "../day7/day7.functions.js";

function step1(input) {
  let data = parseInputData(input);

  var fs = new FileSystem();
  let res = fs.calcSumOfDirs(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  var fs = new FileSystem();
  let res = fs.findDirToDelete(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 