import { expect } from "@jest/globals";
import { parseInputData, Hill } from "../day12/day12.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 12: Hill Climbing Algorithm ---", () => {

  function get_input() {
    let input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('find lowerest by Dijkstra', () => {
    let hill = new Hill();

    let res = hill.countSteps(data);

    expect(res).toBe(31);
  });

  it('find best route from all "a" by Dijkstra', () => {
    let hill = new Hill();

    let res = hill.findBestRoute(data);

    expect(res).toBe(29);
  });
})