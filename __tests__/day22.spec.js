import { expect } from "@jest/globals";
import { parseInputData, MonkeyMap } from "../day22/day22.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 22: Monkey Map ---", () => {

  function get_input() {
    let input = `        ...#    
        .#..    
        #...    
        ....    
...#.......#    
........#...    
..#....#....    
..........#.    
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('check data', () => {
    let {map, route} = data;
    expect(route.length).toBe(7);
  });

  it('moves', () => {
    let {map, route} = data;
    let monkeyMap = new MonkeyMap();

    let pos = monkeyMap.getStartPos(map);
    let direction = { dy: 0, dx: 1};

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[0], direction);
    expect(pos).toMatchObject({y: 0, x: 10});
    expect(direction).toMatchObject({dy: 1, dx: 0});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[1], direction);
    expect(pos).toMatchObject({y: 5, x: 10});
    expect(direction).toMatchObject({dy: 0, dx: 1});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[2], direction);
    expect(pos).toMatchObject({y: 5, x: 3});
    expect(direction).toMatchObject({dy: 1, dx: 0});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[3], direction);
    expect(pos).toMatchObject({y: 7, x: 3});
    expect(direction).toMatchObject({dy: 0, dx: 1});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[4], direction);
    expect(pos).toMatchObject({y: 7, x: 7});
    expect(direction).toMatchObject({dy: 1, dx: 0});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[5], direction);
    expect(pos).toMatchObject({y: 5, x: 7});
    expect(direction).toMatchObject({dy: 0, dx: 1});
/*
    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[5], direction);
    expect(pos).toMatchObject({y: 5, x: 7});
    expect(direction).toMatchObject({dy: -1, dx: 0});
*/    
  });

  it('check sector', () => {
    let {map, route, sectors} = data;
    let monkeyMap = new MonkeyMap();

    let res = monkeyMap.getSector(sectors, {y: 0, x: 9})[0];
    expect(res).toBe(0);

    res = monkeyMap.getSector(sectors, {y: 4, x: 0})[0];
    expect(res).toBe(1);

    res = monkeyMap.getSector(sectors, {y: 4, x: 4})[0];
    expect(res).toBe(2);

    res = monkeyMap.getSector(sectors, {y: 4, x: 9})[0];
    expect(res).toBe(3);

    res = monkeyMap.getSector(sectors, {y: 9, x: 9})[0];
    expect(res).toBe(4);

    res = monkeyMap.getSector(sectors, {y: 9, x: 13})[0];
    expect(res).toBe(5);
  });

  it('turn on cube', () => {
    let {map, route, sectors} = data;
    let monkeyMap = new MonkeyMap();

    let pos = {};
    let res = {};

    // 1) from 1 to 2
    pos = {y: 0, x: 10};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 4, x: 2, direction: {dy: 1, dx: 0}});

    // 2) from 1 to 3
    pos = {y: 2, x: 8};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 4, x: 6, direction: {dy: 1, dx: 0}});

    // 3) from 1 to 6
    pos = {y: 1, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 10, x: 15, direction: {dy: 0, dx: -1}});

    // 4) from 2 to 1
    pos = {y: 4, x: 1};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 0, x: 10, direction: {dy: 1, dx: 0}});

    // 5) from 2 to 6
    pos = {y: 5, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 11, x: 14, direction: {dy: -1, dx: 0}});

    // 6) from 2 to 5
    pos = {y: 7, x: 1};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 11, x: 10, direction: {dy: -1, dx: 0}});

    // 7) from 3 to 1
    pos = {y: 4, x: 5};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 1, x: 8, direction: {dy: 0, dx: 1}});

    // 8) from 3 to 5
    pos = {y: 7, x: 5};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 10, x: 8, direction: {dy: 0, dx: 1}});

    // 9) from 4 to 6
    pos = {y: 5, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 8, x: 14, direction: {dy: 1, dx: 0}});

    // 10) from 5 to 2
    pos = {y: 11, x: 10};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 7, x: 1, direction: {dy: -1, dx: 0}});

    // 11) from 5 to 3
    pos = {y: 10, x: 8};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 7, x: 5, direction: {dy: -1, dx: 0}});

    // 12) from 6 to 1
    pos = {y: 10, x: 15};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 1, x: 11, direction: {dy: 0, dx: -1}});

    // 13) from 6 to 2
    pos = {y: 11, x: 14};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 5, x: 0, direction: {dy: 0, dx: 1}});

    // 14) from 6 to 4
    pos = {y: 8, x: 14};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 5, x: 11, direction: {dy: 0, dx: -1}});
  });

  it('turn on cube 2', () => {
    let input = `    ########
    ########
    ########
    ########
    ####    
    ####    
    ####    
    ####    
########    
########    
########    
########    
####        
####        
####        
####        

10R5L5R10L4R5L5`;

    let data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    let {map, route} = data;
    
    let monkeyMap = new MonkeyMap();
    let sectors = monkeyMap.getSectors(map);

    let pos = {};
    let res = {};

    // 1) from 1 to 2
    pos = {y: 5, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 8, x: 1, direction: {dy: 1, dx: 0}});

    // 2) from 1 to 5
    pos = {y: 5, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 3, x: 9, direction: {dy: -1, dx: 0}});

    // 3) from 2 to 1
    pos = {y: 8, x: 1};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 5, x: 4, direction: {dy: 0, dx: 1}});

    // 4) from 2 to 4
    pos = {y: 9, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 2, x: 4, direction: {dy: 0, dx: 1}});

    // 5) from 3 to 5
    pos = {y: 9, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 2, x: 11, direction: {dy: 0, dx: -1}});

    // 6) from 3 to 6
    pos = {y: 11, x: 6};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 14, x: 3, direction: {dy: 0, dx: -1}});

    // 7) from 4 to 2
    pos = {y: 2, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 9, x: 0, direction: {dy: 0, dx: 1}});

    pos = {y: 0, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 11, x: 0, direction: {dy: 0, dx: 1}});

    // 8) from 4 to 6
    pos = {y: 0, x: 5};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 13, x: 0, direction: {dy: 0, dx: 1}});

    // 9) from 5 to 1
    pos = {y: 3, x: 9};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 5, x: 7, direction: {dy: 0, dx: -1}});

    // 10) from 5 to 3
    pos = {y: 2, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 9, x: 7, direction: {dy: 0, dx: -1}});

    // 11) from 5 to 6
    pos = {y: 0, x: 9};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 15, x: 1, direction: {dy: -1, dx: 0}});

    // 12) from 6 to 3
    pos = {y: 14, x: 3};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 11, x: 6, direction: {dy: -1, dx: 0}});

    // 13) from 6 to 4
    pos = {y: 13, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 0, x: 5, direction: {dy: 1, dx: 0}});

    // 14) from 6 to 5
    pos = {y: 15, x: 1};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 0, x: 9, direction: {dy: 1, dx: 0}});
  });

  it('turn on cube 2 (edges)', () => {
    let input = `    ########
    ########
    ########
    ########
    ####    
    ####    
    ####    
    ####    
########    
########    
########    
########    
####        
####        
####        
####        

10R5L5R10L4R5L5`;

    let data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    let {map, route} = data;
    
    let monkeyMap = new MonkeyMap();
    let sectors = monkeyMap.getSectors(map);

    let pos = {};
    let res = {};

    // 1) from 1 to 2
    pos = {y: 4, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 8, x: 0, direction: {dy: 1, dx: 0}});

    pos = {y: 7, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 8, x: 3, direction: {dy: 1, dx: 0}});

    // 2) from 1 to 5
    pos = {y: 4, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 3, x: 8, direction: {dy: -1, dx: 0}});

    pos = {y: 7, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 3, x: 11, direction: {dy: -1, dx: 0}});

    // 3) from 2 to 1
    pos = {y: 8, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 4, x: 4, direction: {dy: 0, dx: 1}});

    pos = {y: 8, x: 3};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 7, x: 4, direction: {dy: 0, dx: 1}});

    // 4) from 2 to 4
    pos = {y: 8, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 3, x: 4, direction: {dy: 0, dx: 1}});

    pos = {y: 11, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 0, x: 4, direction: {dy: 0, dx: 1}});

    // 5) from 3 to 5
    pos = {y: 8, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 3, x: 11, direction: {dy: 0, dx: -1}});

    pos = {y: 11, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 0, x: 11, direction: {dy: 0, dx: -1}});

    // 6) from 3 to 6
    pos = {y: 11, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 12, x: 3, direction: {dy: 0, dx: -1}});

    pos = {y: 11, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 15, x: 3, direction: {dy: 0, dx: -1}});

    // 7) from 4 to 2
    pos = {y: 0, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 11, x: 0, direction: {dy: 0, dx: 1}});

    pos = {y: 3, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 8, x: 0, direction: {dy: 0, dx: 1}});

    // 8) from 4 to 6
    pos = {y: 0, x: 4};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 12, x: 0, direction: {dy: 0, dx: 1}});

    pos = {y: 0, x: 7};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 15, x: 0, direction: {dy: 0, dx: 1}});

    // 9) from 5 to 1
    pos = {y: 3, x: 8};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 4, x: 7, direction: {dy: 0, dx: -1}});

    pos = {y: 3, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 7, x: 7, direction: {dy: 0, dx: -1}});

    // 10) from 5 to 3
    pos = {y: 0, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 11, x: 7, direction: {dy: 0, dx: -1}});

    pos = {y: 3, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 8, x: 7, direction: {dy: 0, dx: -1}});

    // 11) from 5 to 6
    pos = {y: 0, x: 8};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 15, x: 0, direction: {dy: -1, dx: 0}});

    pos = {y: 0, x: 11};
    res = monkeyMap.nextCubeStep(pos, {dy: -1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 15, x: 3, direction: {dy: -1, dx: 0}});

    // 12) from 6 to 3
    pos = {y: 12, x: 3};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 11, x: 4, direction: {dy: -1, dx: 0}});

    pos = {y: 15, x: 3};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: 1}, sectors);
    expect(res).toMatchObject({y: 11, x: 7, direction: {dy: -1, dx: 0}});

    // 13) from 6 to 4
    pos = {y: 12, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 0, x: 4, direction: {dy: 1, dx: 0}});

    pos = {y: 15, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 0, dx: -1}, sectors);
    expect(res).toMatchObject({y: 0, x: 7, direction: {dy: 1, dx: 0}});

    // 14) from 6 to 5
    pos = {y: 15, x: 0};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 0, x: 8, direction: {dy: 1, dx: 0}});

    pos = {y: 15, x: 3};
    res = monkeyMap.nextCubeStep(pos, {dy: 1, dx: 0}, sectors);
    expect(res).toMatchObject({y: 0, x: 11, direction: {dy: 1, dx: 0}});
  });

  it('moves cube', () => {
    let {map, route, sectors} = data;
    let monkeyMap = new MonkeyMap();

    let pos = monkeyMap.getStartPos(map);
    let direction = { dy: 0, dx: 1};

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[0], direction, sectors);
    expect(pos).toMatchObject({y: 0, x: 10});
    expect(direction).toMatchObject({dy: 1, dx: 0});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[1], direction, sectors);
    expect(pos).toMatchObject({y: 5, x: 10});
    expect(direction).toMatchObject({dy: 0, dx: 1});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[2], direction, sectors);
    expect(pos).toMatchObject({y: 10, x: 14});
    expect(direction).toMatchObject({dy: 0, dx: -1});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[3], direction, sectors);
    expect(pos).toMatchObject({y: 10, x: 10});
    expect(direction).toMatchObject({dy: 1, dx: 0});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[4], direction, sectors);
    expect(pos).toMatchObject({y: 5, x: 1});
    expect(direction).toMatchObject({dy: 0, dx: 1});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[5], direction, sectors);
    expect(pos).toMatchObject({y: 5, x: 6});
    expect(direction).toMatchObject({dy: -1, dx: 0});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[6], direction, sectors);
    expect(pos).toMatchObject({y: 4, x: 6});
    expect(direction).toMatchObject({dy: -1, dx: 0});
  });

  it('moves cube ', () => {
    let {map, route, sectors} = data;
    let monkeyMap = new MonkeyMap();

    let pos = {y: 5, x: 10};
    let direction = {dy: 0, dx: 1};

    let res = monkeyMap.nextCubeStep({y: 5, x: 11}, direction, sectors);
    expect(res).toMatchObject({y: 8, x: 14, direction: {dy: 1, dx: 0}});

    [pos, direction] = monkeyMap.moveInstruction(map, pos, route[2], direction, sectors);
    expect(pos).toMatchObject({y: 10, x: 14});
    expect(direction).toMatchObject({dy: 0, dx: -1});
  });

  it('get sum 1', () => {
    let {map, route} = data;
    let monkeyMap = new MonkeyMap();
    
    let res = monkeyMap.move(map, route);
    expect(res).toBe(6032);
  });

  it('get sum cube', () => {
    let {map, route, sectors} = data;
    let monkeyMap = new MonkeyMap();
    
    let res = monkeyMap.move(map, route, sectors);
    expect(res).toBe(5031);
  });
})