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
    let field = regolith.initField(size.y, size.x);
    regolith.fill(data, field);
    expect(true).toBe(true);
  });

  it('check next point', () => {
    let regolith = new Regolith();

    let size = regolith.getSize(data);
    let field = regolith.initField(size.y, size.x);
    regolith.fill(data, field);

    let point = regolith.nextCoord(field, {y: 8, x: 500});
    expect(point).toMatchObject({y: 8, x: 500});

    point = regolith.nextCoord(field, {y: 7, x: 500});
    expect(point).toMatchObject({y: 8, x: 500});
 
    field[8][500] = regolith.Types.Stone;
    point = regolith.nextCoord(field, {y: 7, x: 500});
    expect(point).toMatchObject({y: 8, x: 499});

    field[8][499] = regolith.Types.Stone;
    point = regolith.nextCoord(field, {y: 7, x: 500});
    expect(point).toMatchObject({y: 8, x: 501});

    field[8][501] = regolith.Types.Stone;
    point = regolith.nextCoord(field, {y: 7, x: 500});
    expect(point).toMatchObject({y: 7, x: 500});

    point = regolith.nextCoord(field, {y: 8, x: 494});
    expect(point).toMatchObject({y: 9, x: 493});

    field[8][494] = regolith.Types.Stone;
    point = regolith.nextCoord(field, {y: 7, x: 494});
    expect(point).toMatchObject({y: 8, x: 493});

    point = regolith.nextCoord(field, {y: 7, x: 494});
    expect(point).toMatchObject({y: 8, x: 493});
  });

  it('stone fall', () => {
    let regolith = new Regolith();

    let size = regolith.getSize(data);
    let field = regolith.initField(size.y, size.x);
    regolith.fill(data, field);

    let res = regolith.stoneFall(field);
    expect(field[8][500]).toBe(regolith.Types.Stone);
    expect(res).toBe(true);

    res = regolith.stoneFall(field);
    expect(field[8][499]).toBe(regolith.Types.Stone);
    expect(res).toBe(true);

    res = regolith.stoneFall(field);
    expect(field[8][501]).toBe(regolith.Types.Stone);
    expect(res).toBe(true);

    res = regolith.stoneFall(field);
    expect(field[7][500]).toBe(regolith.Types.Stone);
    expect(res).toBe(true);

    res = regolith.stoneFall(field);
    expect(field[8][498]).toBe(regolith.Types.Stone);
    expect(res).toBe(true);

    // let subField = regolith.cutField(field, 10, 10, {y: 0, x: 494});
    // console.table(subField);
  });

  it('fall to abyss', () => {
    let regolith = new Regolith();

    let res = regolith.fallToAbyss(data);
    expect(res).toBe(24);
  });
})