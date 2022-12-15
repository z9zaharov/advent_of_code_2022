import { expect } from "@jest/globals";
import { parseInputData, Regolith } from "../day14/day14.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 14: Regolith Reservoir ---", () => {

  function get_input() {
    let input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('fill the field', () => {
    let regolith = new Regolith();

    let size = regolith.getSize(data);
    expect(size).toMatchObject({y: 10, x: 504});
  });

  it('is solid', () => {
    let regolith = new Regolith();

    let res = regolith.isSolid(data, {y: 9, x: 500});
    expect(res).toBe(regolith.Types.Rock);

    res = regolith.isSolid(data, {y: 9, x: 499});
    expect(res).toBe(regolith.Types.Rock);

    res = regolith.isSolid(data, {y: 9, x: 501});
    expect(res).toBe(regolith.Types.Rock);

    res = regolith.isSolid(data, {y: 8, x: 500});
    expect(res).toBe(regolith.Types.Empty);
  });

  it('check next point', () => {
    let regolith = new Regolith();

    let size = regolith.getSize(data);
    let stones = new Array(size.y).fill('').map(a => []);

    let point = regolith.nextCoord(data, stones, {y: 8, x: 500}, size);
    expect(point).toMatchObject({y: 8, x: 500});

    point = regolith.nextCoord(data, stones, {y: 7, x: 500}, size);
    expect(point).toMatchObject({y: 8, x: 500});
 
    stones[8].push(500);
    point = regolith.nextCoord(data, stones, {y: 7, x: 500}, size);
    expect(point).toMatchObject({y: 8, x: 499});

    stones[8].push(499);
    point = regolith.nextCoord(data, stones, {y: 7, x: 500}, size);
    expect(point).toMatchObject({y: 8, x: 501});

    stones[8].push(501);
    point = regolith.nextCoord(data, stones, {y: 7, x: 500}, size);
    expect(point).toMatchObject({y: 7, x: 500});

    point = regolith.nextCoord(data, stones, {y: 8, x: 494}, size);
    expect(point).toMatchObject({y: 9, x: 493});

    stones[8].push(494);
    point = regolith.nextCoord(data, stones, {y: 7, x: 494}, size);
    expect(point).toMatchObject({y: 8, x: 493});

    point = regolith.nextCoord(data, stones, {y: 7, x: 494}, size);
    expect(point).toMatchObject({y: 8, x: 493});

    // let subField = regolith.cutField(data, stones, 10, 10, {y: 0, x: 494});
    // console.table(subField);
  });

  it('stone fall', () => {
    let regolith = new Regolith();

    let size = regolith.getSize(data);
    let stones = new Array(size.y).fill('').map(a => []);

    let res = regolith.stoneFall(data, stones, size);
    expect(stones[8]).toEqual(expect.arrayContaining([500]));
    expect(res).toBe(true);

    res = regolith.stoneFall(data, stones, size);
    expect(stones[8]).toEqual(expect.arrayContaining([500, 499]));
    expect(res).toBe(true);

    res = regolith.stoneFall(data, stones, size);
    expect(stones[8]).toEqual(expect.arrayContaining([500, 499, 501]));
    expect(res).toBe(true);

    res = regolith.stoneFall(data, stones, size);
    expect(stones[7]).toEqual(expect.arrayContaining([500]));
    expect(stones[8]).toEqual(expect.arrayContaining([500, 499, 501]));
    expect(res).toBe(true);

    res = regolith.stoneFall(data, stones, size);
    expect(stones[7]).toEqual(expect.arrayContaining([500]));
    expect(stones[8]).toEqual(expect.arrayContaining([500, 499, 501, 498]));
    expect(res).toBe(true);

    // let subField = regolith.cutField(data, stones, 10, 10, {y: 0, x: 494});
    // console.table(subField);
  });

  it('fall to abyss', () => {
    let regolith = new Regolith();

    let res = regolith.fallToAbyss(data);
    expect(res).toBe(24);
  });

  it('fall to fill', () => {
    let regolith = new Regolith();

    let res = regolith.fillFull(data);
    expect(res).toBe(93);
  });
})