import { expect } from "@jest/globals";
import { parseInputData, MonkeyBusiness } from "../day11/day11.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 11: Monkey in the Middle ---", () => {

  function get_input() {
let input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })


  it('test input data', () => {

    expect(data.length).toBe(4);
    expect(data[0]).toMatchObject({ items: [79, 98], operation: { left: 'old', op: '*', right: '19' }, test: 23, ifTrue: 2, ifFalse: 3, inspections: 0});
    expect(data[1]).toMatchObject({ items: [54, 65, 75, 74], operation: { left: 'old', op: '+', right: '6' }, test: 19, ifTrue: 2, ifFalse: 0, inspections: 0});
    expect(data[2]).toMatchObject({ items: [79, 60, 97], operation: { left: 'old', op: '*', right: 'old' }, test: 13, ifTrue: 1, ifFalse: 3, inspections: 0});
    expect(data[3]).toMatchObject({ items: [74], operation: { left: 'old', op: '+', right: '3' }, test: 17, ifTrue: 0, ifFalse: 1, inspections: 0});
  });

  it('test calculation', () => {

    let monkeyBusiness = new MonkeyBusiness();

    let res = monkeyBusiness.calcOperation(data[0].items[0], data[0].operation);
    expect(res).toBe(1501);
    res = monkeyBusiness.calcOperation(data[0].items[1], data[0].operation);
    expect(res).toBe(1862);

    res = monkeyBusiness.calcOperation(data[1].items[0], data[1].operation);
    expect(res).toBe(60);
    res = monkeyBusiness.calcOperation(data[1].items[1], data[1].operation);
    expect(res).toBe(71);
    res = monkeyBusiness.calcOperation(data[1].items[2], data[1].operation);
    expect(res).toBe(81);
    res = monkeyBusiness.calcOperation(data[1].items[3], data[1].operation);
    expect(res).toBe(80);

    res = monkeyBusiness.calcOperation(data[2].items[0], data[2].operation);
    expect(res).toBe(6241);
    res = monkeyBusiness.calcOperation(data[2].items[1], data[2].operation);
    expect(res).toBe(3600);
    res = monkeyBusiness.calcOperation(data[2].items[2], data[2].operation);
    expect(res).toBe(9409);

    res = monkeyBusiness.calcOperation(data[3].items[0], data[3].operation);
    expect(res).toBe(77);
  });

  it('make inspections round 1', () => {

    let monkeyBusiness = new MonkeyBusiness();
    let divisor = monkeyBusiness.commonDivisor(data);
    monkeyBusiness.inspections(0, data, divisor);
    expect(data[0].items).toEqual(expect.arrayContaining([]));
    expect(data[1].items).toEqual(expect.arrayContaining([54, 65, 75, 74]));
    expect(data[2].items).toEqual(expect.arrayContaining([79, 60, 97]));
    expect(data[3].items).toEqual(expect.arrayContaining([74, 500, 620]));

    monkeyBusiness.inspections(1, data, divisor);
    expect(data[0].items).toEqual(expect.arrayContaining([20, 23, 27, 26]));
    expect(data[1].items).toEqual(expect.arrayContaining([]));
    expect(data[2].items).toEqual(expect.arrayContaining([79, 60, 97]));
    expect(data[3].items).toEqual(expect.arrayContaining([74, 500, 620]));

    monkeyBusiness.inspections(2, data, divisor);
    expect(data[0].items).toEqual(expect.arrayContaining([20, 23, 27, 26]));
    expect(data[1].items).toEqual(expect.arrayContaining([2080]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([74, 500, 620, 1200, 3136]));

    monkeyBusiness.inspections(3, data, divisor);
    expect(data[0].items).toEqual(expect.arrayContaining([20, 23, 27, 26]));
    expect(data[1].items).toEqual(expect.arrayContaining([2080, 25, 167, 207, 401, 1046]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));
  });

  it('make rounds', () => {

    let monkeyBusiness = new MonkeyBusiness();
    // round 1
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([20, 23, 27, 26]));
    expect(data[1].items).toEqual(expect.arrayContaining([2080, 25, 167, 207, 401, 1046]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 2
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([695, 10, 71, 135, 350]));
    expect(data[1].items).toEqual(expect.arrayContaining([43, 49, 58, 55, 362]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 3
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([16, 18, 21, 20, 122]));
    expect(data[1].items).toEqual(expect.arrayContaining([1468, 22, 150, 286, 739]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 4
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([491, 9, 52, 97, 248, 34]));
    expect(data[1].items).toEqual(expect.arrayContaining([39, 45, 43, 258]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 5
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([15, 17, 16, 88, 1037]));
    expect(data[1].items).toEqual(expect.arrayContaining([20, 110, 205, 524, 72]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 6
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([8, 70, 176, 26, 34]));
    expect(data[1].items).toEqual(expect.arrayContaining([481, 32, 36, 186, 2190]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 7
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([162, 12, 14, 64, 732, 17]));
    expect(data[1].items).toEqual(expect.arrayContaining([148, 372, 55, 72]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 8
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([51, 126, 20, 26, 136]));
    expect(data[1].items).toEqual(expect.arrayContaining([343, 26, 30, 1546, 36]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 9
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([116, 10, 12, 517, 14]));
    expect(data[1].items).toEqual(expect.arrayContaining([108, 267, 43, 55, 288]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 10
    monkeyBusiness.round(data);
    expect(data[0].items).toEqual(expect.arrayContaining([91, 16, 20, 98]));
    expect(data[1].items).toEqual(expect.arrayContaining([481, 245, 22, 26, 1092, 30]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 15
    monkeyBusiness.makeRounds(data, 5);
    expect(data[0].items).toEqual(expect.arrayContaining([83, 44, 8, 184, 9, 20, 26, 102]));
    expect(data[1].items).toEqual(expect.arrayContaining([110, 36]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));

    // round 20
    monkeyBusiness.makeRounds(data, 5);
    expect(data[0].items).toEqual(expect.arrayContaining([10, 12, 14, 26, 34]));
    expect(data[1].items).toEqual(expect.arrayContaining([245, 93, 53, 199, 115]));
    expect(data[2].items).toEqual(expect.arrayContaining([]));
    expect(data[3].items).toEqual(expect.arrayContaining([]));
  });  

  it('make rounds', () => {

    let monkeyBusiness = new MonkeyBusiness();

    monkeyBusiness.makeRounds(data, 20);
    let inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([101, 95, 7, 105]));
  });  

  it('monkey business', () => {

    let monkeyBusiness = new MonkeyBusiness();

    let res = monkeyBusiness.monkeyBusiness(data, 20);

    expect(res).toBe(10605);
  });  

  it('check inspections without worry level', () => {

    let monkeyBusiness = new MonkeyBusiness();

    // == After round 1 ==
    monkeyBusiness.makeRounds(data, 1, 1);
    let inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([2, 4, 3, 6]));

    // == After round 20 ==
    monkeyBusiness.makeRounds(data, 19, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([99, 97, 8, 103]));

    // == After round 1000 ==
    monkeyBusiness.makeRounds(data, 980, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([5204, 4792, 199, 5192]));

    // == After round 2000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([10419, 9577, 392, 10391]));

    // == After round 3000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([15638, 14358, 587, 15593]));

    // == After round 4000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([20858, 19138, 780, 20797]));

    // == After round 5000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([26075, 23921, 974, 26000]));

    // == After round 6000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([31294, 28702, 1165, 31204]));

    // == After round 7000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([36508, 33488, 1360, 36400]));

    // == After round 8000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([41728, 38268, 1553, 41606]));

    // == After round 9000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([46945, 43051, 1746, 46807]));

    // == After round 10000 ==
    monkeyBusiness.makeRounds(data, 1000, 1);
    inspections = data.map(monkey => monkey.inspections);
    expect(inspections).toEqual(expect.arrayContaining([52166, 47830, 1938, 52013]));
  }); 
  
  it('monkey business 2', () => {

    let monkeyBusiness = new MonkeyBusiness();

    let res = monkeyBusiness.monkeyBusiness(data, 10000, 1);

    expect(res).toBe(2713310158);
  });  
})