/**
 * --- Day 5: Supply Stacks ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, CrateMover } from "../day5/day5.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  const crane = new CrateMover();

  const res = crane.getMessageFromTops(data.stacks, data.moves, crane.moveCmd);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  const crane = new CrateMover();

  const res = crane.getMessageFromTops(data.stacks, data.moves, crane.moveCmd9001);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 