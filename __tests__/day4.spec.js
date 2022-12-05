import { expect } from "@jest/globals";
import { parseInputData, Cleanup } from "../day4/day4.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 4: Camp Cleanup ---", () => {

  function get_input() {
    let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('check overlap', () => {
    var cleanup = new Cleanup();

    expect(cleanup.isOverlap(data[0][0], data[0][1])).toBe(false);
    expect(cleanup.isOverlap(data[1][0], data[1][1])).toBe(false);
    expect(cleanup.isOverlap(data[2][0], data[2][1])).toBe(false);
    expect(cleanup.isOverlap(data[3][0], data[3][1])).toBe(true);
    expect(cleanup.isOverlap(data[4][0], data[4][1])).toBe(true);
    expect(cleanup.isOverlap(data[5][0], data[5][1])).toBe(false);
  }); 

  it('count overlaps', () => {
    var cleanup = new Cleanup();

    expect(cleanup.countOverlaps(data, cleanup.isOverlap)).toBe(2);
  }); 

  it.only('check overlap any', () => {
    var cleanup = new Cleanup();

    expect(cleanup.isOverlapAny(data[0][0], data[0][1])).toBe(false);
    expect(cleanup.isOverlapAny(data[1][0], data[1][1])).toBe(false);
    expect(cleanup.isOverlapAny(data[2][0], data[2][1])).toBe(true);
    expect(cleanup.isOverlapAny(data[3][0], data[3][1])).toBe(true);
    expect(cleanup.isOverlapAny(data[4][0], data[4][1])).toBe(true);
    expect(cleanup.isOverlapAny(data[5][0], data[5][1])).toBe(true);
  }); 

  it('count overlaps any', () => {
    var cleanup = new Cleanup();

    expect(cleanup.countOverlaps(data, cleanup.isOverlapAny)).toBe(4);
  }); 
});