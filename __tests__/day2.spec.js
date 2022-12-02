import { expect } from "@jest/globals";
import { parseInputData, RockPaperScissors } from "../day2/day2.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 2: Rock Paper Scissors ---", () => {

  function get_input() {
    let input = `A Y
B X
C Z`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('play game round', () => {
    var game = new RockPaperScissors();

    expect(game.playRound('A', 'Y')).toBe(8);
    expect(game.playRound('B', 'X')).toBe(1);
    expect(game.playRound('C', 'Z')).toBe(6);
  }); 

  it('play game', () => {
    var game = new RockPaperScissors();

    expect(game.playGame(data)).toBe(15);
  }); 

  it('get outcomes', () => {
    var game = new RockPaperScissors();
    
    expect(game.getYourOutcome('A', 'Y')).toBe('A');
    expect(game.getYourOutcome('B', 'X')).toBe('A');
    expect(game.getYourOutcome('C', 'Z')).toBe('A');
  }); 

  it('play game round on strategy', () => {
    var game = new RockPaperScissors();
    
    expect(game.playRoundOnStrategy('A', 'Y')).toBe(4);
    expect(game.playRoundOnStrategy('B', 'X')).toBe(1);
    expect(game.playRoundOnStrategy('C', 'Z')).toBe(7);
  }); 

  it('play game on strategy', () => {
    var game = new RockPaperScissors();

    expect(game.playGameOnStrategy(data)).toBe(12);
  }); 
});