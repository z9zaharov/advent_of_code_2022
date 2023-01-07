import { expect } from "@jest/globals";
import { parseInputData, MonkeyMath } from "../day21/day21.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 21: Monkey Math ---", () => {

  function get_input() {
    let input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('calculate', () => {
    let monkeyMath = new MonkeyMath();

    let res = monkeyMath.calculate(data, 'root');
    expect(res).toBe(152);
  });

  it('get equality', () => {
    let monkeyMath = new MonkeyMath();

    let parts = monkeyMath.equalityParts(data);
    let res = monkeyMath.getEquality(data, parts.const, parts.calc);
  
    expect(res).toBe(301);
  });

})