import { expect } from "@jest/globals";
import { parseInputData, Calories } from "../day1/day1.functions.js";
import { split_blocks } from '../utils/utils';

describe("Day 1", () => {

  function get_input() {
    let input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('elves number', () => {
    expect(data.length).toBe(5);
  }); 

  it('max calories', () => {
    let calories = new Calories();
    let res = calories.getMax(data);
    expect(res).toBe(24000);
  });  

  it('3 max calories', () => {
    let calories = new Calories();
    // let res = calories.threeMax(data);
    // expect(res).toBe(45000);

    let res = calories.threeLargest(data);
    expect(res).toBe(45000);
  });  
});