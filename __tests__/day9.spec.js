import { expect } from "@jest/globals";
import { parseInputData, RopeBridge } from "../day9/day9.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 9: Rope Bridge ---", () => {

  function get_input() {
    let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })


  it('make step', () => {
    let ropeBridge = new RopeBridge();

    // == Initial State ==
    let [head, tail] = ropeBridge.getInitRopePos();
    
    // == R 4 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 1});
    expect(tail).toMatchObject({y: 0, x: 0});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 2});
    expect(tail).toMatchObject({y: 0, x: 1});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 3});
    expect(tail).toMatchObject({y: 0, x: 2});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 4});
    expect(tail).toMatchObject({y: 0, x: 3});

    // == U 4 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 1, x: 4});
    expect(tail).toMatchObject({y: 0, x: 3});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 2, x: 4});
    expect(tail).toMatchObject({y: 1, x: 4});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 3, x: 4});
    expect(tail).toMatchObject({y: 2, x: 4});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 4, x: 4});
    expect(tail).toMatchObject({y: 3, x: 4});

    // == L 3 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 4, x: 3});
    expect(tail).toMatchObject({y: 3, x: 4});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 4, x: 2});
    expect(tail).toMatchObject({y: 4, x: 3});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 4, x: 1});
    expect(tail).toMatchObject({y: 4, x: 2});

    // == D 1 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.D)
    expect(head).toMatchObject({y: 3, x: 1});
    expect(tail).toMatchObject({y: 4, x: 2});

    // == R 4 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 3, x: 2});
    expect(tail).toMatchObject({y: 4, x: 2});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 3, x: 3});
    expect(tail).toMatchObject({y: 4, x: 2});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 3, x: 4});
    expect(tail).toMatchObject({y: 3, x: 3});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 3, x: 5});
    expect(tail).toMatchObject({y: 3, x: 4});

    // == D 1 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.D)
    expect(head).toMatchObject({y: 2, x: 5});
    expect(tail).toMatchObject({y: 3, x: 4});

    // == L 5 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 2, x: 4});
    expect(tail).toMatchObject({y: 3, x: 4});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 2, x: 3});
    expect(tail).toMatchObject({y: 3, x: 4});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 2, x: 2});
    expect(tail).toMatchObject({y: 2, x: 3});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 2, x: 1});
    expect(tail).toMatchObject({y: 2, x: 2});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.L)
    expect(head).toMatchObject({y: 2, x: 0});
    expect(tail).toMatchObject({y: 2, x: 1});

    // == R 2 ==
    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 2, x: 1});
    expect(tail).toMatchObject({y: 2, x: 1});

    [head, tail] = ropeBridge.makeStep(head, tail, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 2, x: 2});
    expect(tail).toMatchObject({y: 2, x: 1});
  }); 

  it('make moves', () => {
    let ropeBridge = new RopeBridge();

    // == Initial State ==
    let [head, tail] = ropeBridge.getInitRopePos();
    
    // == R 4 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.R, steps: 4}, []);
    expect(head).toMatchObject({y: 0, x: 4});
    expect(tail).toMatchObject({y: 0, x: 3});

    // == U 4 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.U, steps: 4}, []);
    expect(head).toMatchObject({y: 4, x: 4});
    expect(tail).toMatchObject({y: 3, x: 4});

    // == L 3 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.L, steps: 3}, []);
    expect(head).toMatchObject({y: 4, x: 1});
    expect(tail).toMatchObject({y: 4, x: 2});

    // == D 1 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.D, steps: 1}, []);
    expect(head).toMatchObject({y: 3, x: 1});
    expect(tail).toMatchObject({y: 4, x: 2});

    // == R 4 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.R, steps: 4}, []);
    expect(head).toMatchObject({y: 3, x: 5});
    expect(tail).toMatchObject({y: 3, x: 4});

    // == D 1 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.D, steps: 1}, []);
    expect(head).toMatchObject({y: 2, x: 5});
    expect(tail).toMatchObject({y: 3, x: 4});

    // == L 5 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.L, steps: 5}, []);
    expect(head).toMatchObject({y: 2, x: 0});
    expect(tail).toMatchObject({y: 2, x: 1});

    // == R 2 ==
    [head, tail] = ropeBridge.makeMove(head, tail, { dir: ropeBridge.Directions.R, steps: 2}, []);
    expect(head).toMatchObject({y: 2, x: 2});
    expect(tail).toMatchObject({y: 2, x: 1});
  }); 

  it('pass route', () => {
    let ropeBridge = new RopeBridge();

    let res = ropeBridge.passRoute(data);
    expect(res).toBe(13);
  });

  it('make long step', () => {
    let ropeBridge = new RopeBridge();

    // == Initial State ==
    let [head, tail] = ropeBridge.getInitRopePos();
    let tails = ropeBridge.getInitLongTail();
    
    // == R 4 ==
    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 1});
    expect(tails[0]).toMatchObject({y: 0, x: 0});
    expect(tails[1]).toMatchObject({y: 0, x: 0});

    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 2});
    expect(tails[0]).toMatchObject({y: 0, x: 1});
    expect(tails[1]).toMatchObject({y: 0, x: 0});

    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 3});
    expect(tails[0]).toMatchObject({y: 0, x: 2});
    expect(tails[1]).toMatchObject({y: 0, x: 1});

    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.R)
    expect(head).toMatchObject({y: 0, x: 4});
    expect(tails[0]).toMatchObject({y: 0, x: 3});
    expect(tails[1]).toMatchObject({y: 0, x: 2});
    expect(tails[2]).toMatchObject({y: 0, x: 1});
    expect(tails[3]).toMatchObject({y: 0, x: 0});

    // == U 4 ==
    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 1, x: 4});
    expect(tails[0]).toMatchObject({y: 0, x: 3});
    expect(tails[1]).toMatchObject({y: 0, x: 2});
    expect(tails[2]).toMatchObject({y: 0, x: 1});
    expect(tails[3]).toMatchObject({y: 0, x: 0});

    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 2, x: 4});
    expect(tails[0]).toMatchObject({y: 1, x: 4});
    expect(tails[1]).toMatchObject({y: 1, x: 3});
    expect(tails[2]).toMatchObject({y: 1, x: 2});
    expect(tails[3]).toMatchObject({y: 1, x: 1});
    expect(tails[4]).toMatchObject({y: 0, x: 0});

    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 3, x: 4});
    expect(tails[0]).toMatchObject({y: 2, x: 4});
    expect(tails[1]).toMatchObject({y: 1, x: 3});
    expect(tails[2]).toMatchObject({y: 1, x: 2});
    expect(tails[3]).toMatchObject({y: 1, x: 1});
    expect(tails[4]).toMatchObject({y: 0, x: 0});

    head = ropeBridge.makeLongStep(head, tails, ropeBridge.Directions.U)
    expect(head).toMatchObject({y: 4, x: 4});
    expect(tails[0]).toMatchObject({y: 3, x: 4});
    expect(tails[1]).toMatchObject({y: 2, x: 4});
    expect(tails[2]).toMatchObject({y: 2, x: 3});
    expect(tails[3]).toMatchObject({y: 2, x: 2});
    expect(tails[4]).toMatchObject({y: 1, x: 1});
    expect(tails[5]).toMatchObject({y: 0, x: 0});
  });

  it('make long moves', () => {
    let ropeBridge = new RopeBridge();

    // == Initial State ==
    let [head, tail] = ropeBridge.getInitRopePos();
    let tails = ropeBridge.getInitLongTail();
    let history = [];
    
    // == R 4 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.R, steps: 4}, history);
    expect(head).toMatchObject({y: 0, x: 4});
    expect(tails[0]).toMatchObject({y: 0, x: 3});
    expect(tails[1]).toMatchObject({y: 0, x: 2});
    expect(tails[2]).toMatchObject({y: 0, x: 1});
    expect(tails[3]).toMatchObject({y: 0, x: 0});
    expect(tails[4]).toMatchObject({y: 0, x: 0});

  //   // == U 4 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.U, steps: 4}, history);
    expect(head).toMatchObject({y: 4, x: 4});
    expect(tails[0]).toMatchObject({y: 3, x: 4}); // 1
    expect(tails[1]).toMatchObject({y: 2, x: 4}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6

  //   // == L 3 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.L, steps: 3}, []);
    expect(head).toMatchObject({y: 4, x: 1});
    expect(tails[0]).toMatchObject({y: 4, x: 2}); // 1
    expect(tails[1]).toMatchObject({y: 3, x: 3}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6

  //   // == D 1 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.D, steps: 1}, []);
    expect(head).toMatchObject({y: 3, x: 1});
    expect(tails[0]).toMatchObject({y: 4, x: 2}); // 1
    expect(tails[1]).toMatchObject({y: 3, x: 3}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6

  //   // == R 4 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.R, steps: 4}, []);
    expect(head).toMatchObject({y: 3, x: 5});
    expect(tails[0]).toMatchObject({y: 3, x: 4}); // 1
    expect(tails[1]).toMatchObject({y: 3, x: 3}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6

  //   // == D 1 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.D, steps: 1}, []);
    expect(head).toMatchObject({y: 2, x: 5});
    expect(tails[0]).toMatchObject({y: 3, x: 4}); // 1
    expect(tails[1]).toMatchObject({y: 3, x: 3}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6

  //   // == L 5 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.L, steps: 5}, []);
    expect(head).toMatchObject({y: 2, x: 0});
    expect(tails[0]).toMatchObject({y: 2, x: 1}); // 1
    expect(tails[1]).toMatchObject({y: 2, x: 2}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6

  //   // == R 2 ==
    [head, tails] = ropeBridge.makeLongMove(head, tails, { dir: ropeBridge.Directions.R, steps: 2}, []);
    expect(head).toMatchObject({y: 2, x: 2});
    expect(tails[0]).toMatchObject({y: 2, x: 1}); // 1
    expect(tails[1]).toMatchObject({y: 2, x: 2}); // 2
    expect(tails[2]).toMatchObject({y: 2, x: 3}); // 3
    expect(tails[3]).toMatchObject({y: 2, x: 2}); // 4
    expect(tails[4]).toMatchObject({y: 1, x: 1}); // 5
    expect(tails[5]).toMatchObject({y: 0, x: 0}); // 6
  });   

  it('make step', () => {
    let input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

    data = parseInputData(split_blocks(input, /\n/));
    
    let ropeBridge = new RopeBridge();

    let res = ropeBridge.passLongRoute(data);
    expect(res).toBe(36);
  });
})