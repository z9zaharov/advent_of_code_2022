/**
 * --- Day 21: Monkey Math ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, MonkeyMath } from "../day21/day21.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let monkeyMath = new MonkeyMath();

  let res = monkeyMath.calculate(data, 'root');

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let monkeyMath = new MonkeyMath();

  let parts = monkeyMath.equalityParts(data);
  let res = monkeyMath.getEquality(data, parts.const, parts.calc);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 