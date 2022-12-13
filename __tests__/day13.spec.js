import { expect } from "@jest/globals";
import { parseInputData, DistressSignal } from "../day13/day13.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 13: Distress Signal ---", () => {

  function get_input() {
let input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('test input data', () => {
    expect(data.length).toBe(8);
  });

  it('test expressions with brackets', () => {
    let signals = new DistressSignal();
    let obj = [];

    obj = signals.parseLine('[1,2]');
    expect(obj).toEqual(expect.arrayContaining([1, 2]));

    obj = signals.parseLine('[[1,2],3]');
    expect(obj).toEqual(expect.arrayContaining([[1,  2], 3]));

    obj = signals.parseLine('[9,[8,7]]');
    expect(obj).toEqual(expect.arrayContaining([9, [8, 7]]));

    obj = signals.parseLine('[[1,9],[8,5]]');
    expect(obj).toEqual(expect.arrayContaining([[ 1, 9], [8, 5]]));

    obj = signals.parseLine('[[[[1,2],[3,4]],[[5,6],[7,8]]],9]');
    expect(obj).toEqual(expect.arrayContaining([[[[1, 2],[3, 4]],[[5, 6],[7, 8]]], 9]));
  })

  it('test expressions from input', () => {
    let signals = new DistressSignal();
    let obj = {};

    obj = signals.parseLine(data[0].left);
    expect(obj).toEqual(expect.arrayContaining([1,1,3,1,1]));
    obj = signals.parseLine(data[0].right);
    expect(obj).toEqual(expect.arrayContaining([1,1,5,1,1]));

    obj = signals.parseLine(data[1].left);
    expect(obj).toEqual(expect.arrayContaining([[1],[2,3,4]]));
    obj = signals.parseLine(data[1].right);
    expect(obj).toEqual(expect.arrayContaining([[1],4]));

    obj = signals.parseLine(data[2].left);
    expect(obj).toEqual(expect.arrayContaining([9]));
    obj = signals.parseLine(data[2].right);
    expect(obj).toEqual(expect.arrayContaining([[8,7,6]]));

    obj = signals.parseLine(data[3].left);
    expect(obj).toEqual(expect.arrayContaining([[4,4],4,4]));
    obj = signals.parseLine(data[3].right);
    expect(obj).toEqual(expect.arrayContaining([[4,4],4,4,4]));

    obj = signals.parseLine(data[4].left);
    expect(obj).toEqual(expect.arrayContaining([7,7,7,7]));
    obj = signals.parseLine(data[4].right);
    expect(obj).toEqual(expect.arrayContaining([7,7,7]));

    obj = signals.parseLine(data[5].left);
    expect(obj).toEqual(expect.arrayContaining([]));
    obj = signals.parseLine(data[5].right);
    expect(obj).toEqual(expect.arrayContaining([3]));

    obj = signals.parseLine(data[6].left);
    expect(obj).toEqual(expect.arrayContaining([[[]]]));
    obj = signals.parseLine(data[6].right);
    expect(obj).toEqual(expect.arrayContaining([[]]));

    obj = signals.parseLine(data[7].left);
    expect(obj).toEqual(expect.arrayContaining([1,[2,[3,[4,[5,6,7]]]],8,9]));
    obj = signals.parseLine(data[7].right);
    expect(obj).toEqual(expect.arrayContaining([1,[2,[3,[4,[5,6,0]]]],8,9]));
  })

  it('test compare strings', () => {
    let signals = new DistressSignal();

    let left = signals.parseLine(data[0].left);
    let right = signals.parseLine(data[0].right);
    let res = signals.compare(left, right);
    expect(res).toBeLessThan(0);
    
    left = signals.parseLine(data[1].left);
    right = signals.parseLine(data[1].right);
    res = signals.compare(left, right);
    expect(res).toBeLessThan(0);
    
    left = signals.parseLine(data[2].left);
    right = signals.parseLine(data[2].right);
    res = signals.compare(left, right);
    expect(res).toBeGreaterThan(0);
    
    left = signals.parseLine(data[3].left);
    right = signals.parseLine(data[3].right);
    res = signals.compare(left, right);
    expect(res).toBeLessThan(0);
    
    left = signals.parseLine(data[4].left);
    right = signals.parseLine(data[4].right);
    res = signals.compare(left, right);
    expect(res).toBeGreaterThan(0);
    
    left = signals.parseLine(data[5].left);
    right = signals.parseLine(data[5].right);
    res = signals.compare(left, right);
    expect(res).toBeLessThan(0);
    
    left = signals.parseLine(data[6].left);
    right = signals.parseLine(data[6].right);
    res = signals.compare(left, right);
    expect(res).toBeGreaterThan(0);
    
    left = signals.parseLine(data[7].left);
    right = signals.parseLine(data[7].right);
    res = signals.compare(left, right);
    expect(res).toBeGreaterThan(0);
  });

  it('test compare strings from real data', () => {
    let signals = new DistressSignal();

    let left = signals.parseLine('[[[[4],[3],1],[9],[[9,2],[4],0]],[],[[],3,[[0,3],0,4],[8,10,8,[1,2,5],10],1]]');
    let right = signals.parseLine('[[[],[[1,4,7,3,6],2,[]]],[[[2,9],9,[2,9,10,9,0]],3]]');
    let res = signals.compare(left, right);
    expect(res).toBeGreaterThan(0);

    left = signals.parseLine('[5,[[],0,7]]');
    right = signals.parseLine('[[5,[2,6],1]]');
    res = signals.compare(left, right);
    expect(res).toBeLessThan(0);

    left = signals.parseLine('[[5,[[],0,7],[0,8,[],[8]],[2],[]],[2,8,[[8,5,5,0,1],1],[[3,9],2],[1,9]],[[2,[1,7,7,8,0],[10,4],[0,9,1],0],10,[[5,4,6],[4,1,3,4]],8]]');
    right = signals.parseLine('[[[5,[2,6],1]],[4,[[]],7,[5,0,[2],[9,10,1]],7]]');
    res = signals.compare(left, right);
    expect(res).toBeLessThan(0);
  });

  it('test count right signals', () => {
    let signals = new DistressSignal();

    let res = signals.countRight(data);
    expect(res).toBe(13);
  });

  it('get decoder key', () => {
    let signals = new DistressSignal();

    let res = signals.decoderKey(data);
    expect(res).toBe(140);
  });
})