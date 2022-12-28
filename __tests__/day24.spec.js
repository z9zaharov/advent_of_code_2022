import { expect } from "@jest/globals";
import { parseInputData, BlizzardBasin } from "../day24/day24.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 24: Blizzard Basin ---", () => {

  function get_input() {
    let input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('get neighbour', () => {
    let basin = new BlizzardBasin();

    let map = data.map;

    let neigbourX = basin.getNext(map[0].length, 1, 1);
    expect(neigbourX).toBe(2);

    neigbourX = basin.getNext(map[0].length, -1, 1);
    expect(neigbourX).toBe(6);

    neigbourX = basin.getNext(map[0].length, 1, 6);
    expect(neigbourX).toBe(1);

    neigbourX = basin.getNext(map[0].length, -1, 6);
    expect(neigbourX).toBe(5);

    let neigbourY = basin.getNext(map.length, -1, 1);
    expect(neigbourY).toBe(4);
  });

  it('next point state', () => {
    let basin = new BlizzardBasin();

    let map = data.map;

    let point = basin.getNextPointState(map, 1, 1);
    expect(point).toBe(0);

    point = basin.getNextPointState(map, 1, 2);
    expect(point).toBe(0b0001);

    point = basin.getNextPointState(map, 1, 3);
    expect(point).toBe(0b1011);
  });

  it('next states', () => {
    let basin = new BlizzardBasin();

    let states = basin.generateAllStates(data);
    let state = states[1];
    expect(state[1][3]).toBe(0b1011);

    state = basin.getMapState(states, 2);
    expect(state[1][2]).toBe(0b1010);

    state = basin.getMapState(states, 2);
    console.table(basin.mapToString(state));
    expect(state[1][2]).toBe(0b1010);
  });

  it('next state moves', () => {
    let basin = new BlizzardBasin();

    let states = basin.generateAllStates(data);
    let availMoves = basin.getMoves(states[1], data.start);

    expect(availMoves.length).toBe(2);
  });

  it('is finish available after 17 minutes', () => {
    let basin = new BlizzardBasin();

    let states = basin.generateAllStates(data);

    let availMoves = basin.getMoves(states[17], {y: 4, x: 6});
    expect(availMoves.length).toBe(2);
    expect(availMoves).toEqual(expect.arrayContaining([{y: 4, x: 6}, {y: 5, x: 6}]));
  });

  it('get min route', () => {
    let basin = new BlizzardBasin();

    let res = basin.getMinRoute(data);
    expect(res).toBe(18);
  });
})