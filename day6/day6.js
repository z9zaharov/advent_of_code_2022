/**
 * --- Day 6: Tuning Trouble ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, CommDevice } from "../day6/day6.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  var device = new CommDevice();

  const res = device.findMarkerPos(data[0], device.MARKER_LENGTH);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  var device = new CommDevice();

  const res = device.findMarkerPos(data[0], device.MESSAGE_LENGTH);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 