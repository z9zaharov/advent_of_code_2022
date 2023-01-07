/**
 * --- Day 17: Pyroclastic Flow ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, FlyingRocks } from "../day17/day17.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let flyingRocks = new FlyingRocks();

  let res = flyingRocks.fallRocks(data[0], 2022);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let rocks = new FlyingRocks();


//  let res = rocks.fallRocks(data[0], 1000000000000);

// in third row (field[2])
// from 379
// every 1740 rocks

// 574,712,643 times

// 801 left before 1000000000000

// 2681 * 574712643 + 571 = 1540804596454 + 2
// + from move 2257 with rock 4 801 rocks

// 1540804596454 + 1228 = 1540804597682

  let field = [137, 169];
  let res = rocks.fallRocks(data[0], 801, 2257, 4, field);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 