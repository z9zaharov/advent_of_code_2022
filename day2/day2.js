/**
 * --- Day 2: Rock Paper Scissors ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, RockPaperScissors } from "../day2/day2.functions.js";

function step1(input) {
  let data = parseInputData(input);

  let game = new RockPaperScissors();
  let res = game.playGame(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input);

  let game = new RockPaperScissors();
  let res = game.playGameOnStrategy(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 