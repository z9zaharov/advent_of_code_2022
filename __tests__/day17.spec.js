import { expect } from "@jest/globals";
import { parseInputData, FlyingRocks } from "../day17/day17.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 17: Pyroclastic Flow ---", () => {

  function get_input() {
    let input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('is in boundary', () => {
    let rocks = new FlyingRocks();

    let point = rocks.shifted(rocks.Rocks['HorBar'], rocks.MoveTypes.Left);
    expect(point[0]).toBe(0b11110);

    point = rocks.shifted(point, rocks.MoveTypes.Right);
    expect(point[0]).toBe(0b1111);

    point = rocks.shifted(point, rocks.MoveTypes.Right);
    expect(point[0]).toBe(0b1111);

    point = rocks.shifted(point, rocks.MoveTypes.Left);
    expect(point[0]).toBe(0b11110);

    point = rocks.shifted(point, rocks.MoveTypes.Left);
    expect(point[0]).toBe(0b111100);

    point = rocks.shifted(point, rocks.MoveTypes.Left);
    expect(point[0]).toBe(0b1111000);

    point = rocks.shifted(point, rocks.MoveTypes.Left);
    expect(point[0]).toBe(0b1111000);
  });

  it('on shift', () => {
    let rocks = new FlyingRocks();

    let point = rocks.onShift(rocks.Rocks['HorBar'], rocks.MoveTypes.Left, [0]);
    expect(point[0]).toBe(0b11110);

    point = rocks.onShift(point, rocks.MoveTypes.Right, [0b0000001]);
    expect(point[0]).toBe(0b11110);
  });

  it('can fall', () => {
    let rocks = new FlyingRocks();

    let point = rocks.onShift(rocks.Rocks['HorBar'], rocks.MoveTypes.Left, [0]);
    expect(point[0]).toBe(0b11110);

    let res = rocks.canFall(point, [0, 0]);
    expect(res).toBe(true);

    res = rocks.canFall(point, [0, 1]);
    expect(res).toBe(true);  

    res = rocks.canFall(point, [0, 0b10]);
    expect(res).toBe(false);  
  });

  it('make step', () => {
    let rocks = new FlyingRocks();

    let point = rocks.onShift(rocks.Rocks['HorBar'], rocks.MoveTypes.Left, [0]);
    expect(point[0]).toBe(0b11110);

    let res = rocks.canFall(point, [0, 0]);
    expect(res).toBe(true);

    let field = [];
    point = rocks.makeStep(point, rocks.MoveTypes.Right, field);
    expect(field.length).toBe(1);

  });

  it('falling rocks', () => {
    let rocks = new FlyingRocks();

    let field = [];
    let point = rocks.addNewRock('HorBar', field);
    expect(field.length).toBe(4);
  });

  it('falling rocks (square)', () => {
    let rocks = new FlyingRocks();

    let currentMove = 20;
    let field = [0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110];
  
    let type = Object.keys(rocks.Rocks)[4];
    let point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field).toEqual(expect.arrayContaining([0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
    expect(field.length).toBe(9);
  
  })

  it('falling rocks 2', () => {
    let rocks = new FlyingRocks();

    let field = [];
    let currentMove = 0;
    let type = Object.keys(rocks.Rocks)[0];

    let point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(1);
    expect(field).toEqual(expect.arrayContaining([0b10011110]));

    type = Object.keys(rocks.Rocks)[1];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(4);
    expect(field).toEqual(expect.arrayContaining([0b10001000, 0b10011100, 0b10001000, 0b10011110]));

    type = Object.keys(rocks.Rocks)[2];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(6);
    expect(field).toEqual(expect.arrayContaining([0b10010000, 0b10010000, 0b11111000, 0b10011100, 0b10001000, 0b10011110]));

    type = Object.keys(rocks.Rocks)[3];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(7);
    expect(field).toEqual(expect.arrayContaining([0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
  
    type = Object.keys(rocks.Rocks)[4];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field).toEqual(expect.arrayContaining([0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
    expect(field.length).toBe(9);
  
    type = Object.keys(rocks.Rocks)[0];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(10);
    expect(field).toEqual(expect.arrayContaining([0b10111100, 0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
  
    type = Object.keys(rocks.Rocks)[1];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(13);
    expect(field).toEqual(expect.arrayContaining([0b10010000, 0b10111000, 0b10010000, 0b10111100, 0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
  
    type = Object.keys(rocks.Rocks)[2];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(15);
    expect(field).toEqual(expect.arrayContaining([0b10000010, 0b10000010, 0b10011110, 0b10111000, 0b10010000, 0b10111100, 0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
  
    type = Object.keys(rocks.Rocks)[3];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(17);
    expect(field).toEqual(expect.arrayContaining([0b10000100, 0b10000100, 0b10000110, 0b10000110, 0b10011110, 0b10111000, 0b10010000, 0b10111100, 0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));
    
    type = Object.keys(rocks.Rocks)[4];
    point = rocks.addNewRock(type, field);
    currentMove = rocks.fall(point, data[0], currentMove, field);
    expect(field.length).toBe(17);
    expect(field).toEqual(expect.arrayContaining([0b10000100, 0b10000100, 0b10000110, 0b11100110, 0b11111110, 0b10111000, 0b10010000, 0b10111100, 0b10000110, 0b10000110, 0b10000100, 0b10010100, 0b10010100, 0b11111100, 0b10011100, 0b10001000, 0b10011110]));

    console.table(rocks.drawField([0], field));
  });

  it('falling rocks full', () => {
    let rocks = new FlyingRocks();

    let res = rocks.fallRocks(data[0], 2022);
    expect(res).toBe(3068);
  });

  xit('falling rocks full', () => {
    let rocks = new FlyingRocks();

    let res = rocks.fallRocks(data[0], 1000000000000);
    expect(res).toBe(1514285714288);
  });
})