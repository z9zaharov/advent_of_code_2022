/**
 * --- Day 13: Distress Signal ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, DistressSignal } from "../day13/day13.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let signals = new DistressSignal();

  let res = signals.countRight(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let signals = new DistressSignal();

  let res = signals.decoderKey(data);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 