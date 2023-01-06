/**
 * --- Day 22: Monkey Map ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, MonkeyMap } from "./day22.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let {map, route} = data;
  let monkeyMap = new MonkeyMap();

  let res = monkeyMap.move(map, route);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let {map, route} = data;
  let monkeyMap = new MonkeyMap();

  let sectors = monkeyMap.getSectors(map);

  let res = monkeyMap.move(map, route, sectors);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 