import { expect } from "@jest/globals";
import { parseInputData, CathodeRayTube } from "../day10/day10.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 10: Cathode-Ray Tube ---", () => {

  function get_input() {
let input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })


  it('exec simple program', () => {
    let input = `noop
addx 3
addx -5`;
    
    data = parseInputData(split_blocks(input, /\n/));    

    let tube = new CathodeRayTube();
    let res = tube.sumStrength(data);
    expect(res).toBe(0);
    expect(tube.Cycle).toBe(6);
    expect(tube.X).toBe(-1);
  });

  it('exec program', () => {
    let tube = new CathodeRayTube();

    let res = tube.sumStrength(data);
    expect(res).toBe(13140);
  });

  it('exec program with display', () => {
    let tube = new CathodeRayTube();

    let res = tube.display(data);
    expect(res[0]).toBe('##..##..##..##..##..##..##..##..##..##..');
    expect(res[1]).toBe('###...###...###...###...###...###...###.');
    expect(res[2]).toBe('####....####....####....####....####....');
    expect(res[3]).toBe('#####.....#####.....#####.....#####.....');
    expect(res[4]).toBe('######......######......######......####');
    expect(res[5]).toBe('#######.......#######.......#######.....');
  });
})