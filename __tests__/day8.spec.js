import { expect } from "@jest/globals";
import { parseInputData, TreeHouse } from "../day8/day8.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 8: Treetop Tree House ---", () => {

  function get_input() {
    let input = `30373
25512
65332
33549
35390`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })


  it('count weights', () => {
    let trees = new TreeHouse();

    trees.getAroundTopLeft(data, 1, 1);
    expect(data[1][1].around).toMatchObject({top: 0, left: 2, right: -1, down: -1});

    trees.getAroundRightDown(data, 3, 3);
    expect(data[3][3].around).toMatchObject({top: -1, left: -1, right: 9, down: 9});
  }); 

  it('check inner trees visible', () => {
    let trees = new TreeHouse();

    trees.findMaxHeightsAround(data);

    // -- row 2
    expect(data[1][1].around).toMatchObject({top: 0, left: 2, right: 5, down: 5});
    expect(trees.isVisible(data[1][1])).toBe(true);

    expect(data[1][2].around).toMatchObject({top: 3, left: 5, right: 2, down: 5});
    expect(trees.isVisible(data[1][2])).toBe(true);

    expect(data[1][3].around).toMatchObject({top: 7, left: 5, right: 2, down: 9});
    expect(trees.isVisible(data[1][3])).toBe(false);

    // -- row 3
    expect(data[2][1].around).toMatchObject({top: 5, left: 6, right: 3, down: 5});
    expect(trees.isVisible(data[2][1])).toBe(true);

    expect(data[2][2].around).toMatchObject({top: 5, left: 6, right: 3, down: 5});
    expect(trees.isVisible(data[2][2])).toBe(false);

    expect(data[2][3].around).toMatchObject({top: 7, left: 6, right: 2, down: 9});
    expect(trees.isVisible(data[2][3])).toBe(true);

    // -- row 4
    expect(data[3][1].around).toMatchObject({top: 5, left: 3, right: 9, down: 5});
    expect(trees.isVisible(data[3][1])).toBe(false);

    expect(data[3][2].around).toMatchObject({top: 5, left: 3, right: 9, down: 3});
    expect(trees.isVisible(data[3][2])).toBe(true);

    expect(data[3][3].around).toMatchObject({top: 7, left: 5, right: 9, down: 9});
    expect(trees.isVisible(data[3][3])).toBe(false);
  }); 

  it('count visible', () => {
    let trees = new TreeHouse();

    let res = trees.countVisible(data);

    expect(res).toBe(21);
  }); 

  it('check scenic scores', () => {
    let trees = new TreeHouse();


    trees.getScenic(data, 1, 2);
    expect(data[1][2].scenic).toMatchObject({top: 1, left: 1, right: 2, down: 2});
    expect(trees.calcScenicScore(data[1][2])).toBe(4);

    trees.getScenic(data, 3, 2);
    expect(data[3][2].scenic).toMatchObject({top: 2, left: 2, right: 2, down: 1});
    expect(trees.calcScenicScore(data[3][2])).toBe(8);
  }); 

  it('max scenic score', () => {
    let trees = new TreeHouse();

    let res = trees.getMaxScenicScore(data);

    expect(res).toBe(8);
  }); 
})