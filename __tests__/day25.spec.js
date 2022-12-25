import { expect } from "@jest/globals";
import { parseInputData, Snafu } from "../day25/day25.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 25: Full of Hot Air ---", () => {

  function get_input() {
    let input = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('to decimal', () => {
    let snafu = new Snafu();

    expect(snafu.toDecimal('1=-0-2')).toBe(1747);
    expect(snafu.toDecimal('12111')).toBe(906);
    expect(snafu.toDecimal('2=0=')).toBe(198);
    expect(snafu.toDecimal('21')).toBe(11);
    expect(snafu.toDecimal('2=01')).toBe(201);
    expect(snafu.toDecimal('111')).toBe(31);
    expect(snafu.toDecimal('20012')).toBe(1257);
    expect(snafu.toDecimal('112')).toBe(32);
    expect(snafu.toDecimal('1=-1=')).toBe(353);
    expect(snafu.toDecimal('1-12')).toBe(107);
    expect(snafu.toDecimal('12')).toBe(7);
    expect(snafu.toDecimal('1=')).toBe(3);
    expect(snafu.toDecimal('122')).toBe(37);
  });

  it('to snafu', () => {
    let snafu = new Snafu();

    expect(snafu.toSnafu(1)).toBe('1');
    expect(snafu.toSnafu(2)).toBe('2');
    expect(snafu.toSnafu(3)).toBe('1=');
    expect(snafu.toSnafu(4)).toBe('1-');
    expect(snafu.toSnafu(5)).toBe('10');
    expect(snafu.toSnafu(6)).toBe('11');
    expect(snafu.toSnafu(7)).toBe('12');
    expect(snafu.toSnafu(8)).toBe('2=');
    expect(snafu.toSnafu(9)).toBe('2-');
    expect(snafu.toSnafu(10)).toBe('20');
    expect(snafu.toSnafu(15)).toBe('1=0');
    expect(snafu.toSnafu(20)).toBe('1-0');
    expect(snafu.toSnafu(2022)).toBe('1=11-2');
    expect(snafu.toSnafu(12345)).toBe('1-0---0');
    expect(snafu.toSnafu(314159265)).toBe('1121-1110-1=0');
  });

  it('get sum', () => {
    let snafu = new Snafu();

    expect(snafu.getSum(data)).toBe(4890);
  });

  it('sum to snafu', () => {
    let snafu = new Snafu();

    expect(snafu.toSnafu(snafu.getSum(data))).toBe('2=-1=0');
  });
})