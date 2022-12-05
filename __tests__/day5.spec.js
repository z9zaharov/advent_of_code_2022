import { expect } from "@jest/globals";
import { parseInputData, CrateMover } from "../day5/day5.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 5: Supply Stacks ---", () => {

  function get_input() {
    let input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('read current stacks', () => {
    expect(data.stacks[0][1]).toBe('N');
    expect(data.stacks[1][2]).toBe('D');
    expect(data.stacks[2][0]).toBe('P');
  }); 

  it('make moves of crates in stacks', () => {
    const crane = new CrateMover();

    crane.moveCmd(data.stacks, data.moves[0]);
    expect(data.stacks[0][2]).toBe('D');
    expect(data.stacks[1].length).toBe(2);

    crane.moveCmd(data.stacks, data.moves[1]);
    expect(data.stacks[0].length).toBe(0);
    expect(data.stacks[2][3]).toBe('Z');

    crane.moveCmd(data.stacks, data.moves[2]);
    expect(data.stacks[1].length).toBe(0);
    expect(data.stacks[0][1]).toBe('M');

    crane.moveCmd(data.stacks, data.moves[3]);
    expect(data.stacks[0][0]).toBe('C');
    expect(data.stacks[1][0]).toBe('M');
  }); 

  it('get message', () => {
    const crane = new CrateMover();

    const message = crane.getMessageFromTops(data.stacks, data.moves, crane.moveCmd);
    expect(message).toBe('CMZ');
  });

  it('make moves 9001 of crates in stacks', () => {
    const crane = new CrateMover();

    crane.moveCmd9001(data.stacks, data.moves[0]);
    expect(data.stacks[0][2]).toBe('D');
    expect(data.stacks[1].length).toBe(2);

    crane.moveCmd9001(data.stacks, data.moves[1]);
    expect(data.stacks[0].length).toBe(0);
    expect(data.stacks[2][3]).toBe('D');

    crane.moveCmd9001(data.stacks, data.moves[2]);
    expect(data.stacks[1].length).toBe(0);
    expect(data.stacks[0][1]).toBe('C');

    crane.moveCmd9001(data.stacks, data.moves[3]);
    expect(data.stacks[0][0]).toBe('M');
    expect(data.stacks[1][0]).toBe('C');
  }); 

  it('get message 9001', () => {
    const crane = new CrateMover();

    const message = crane.getMessageFromTops(data.stacks, data.moves, crane.moveCmd9001);
    expect(message).toBe('MCD');
  });
});