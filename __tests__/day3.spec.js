import { expect } from "@jest/globals";
import { parseInputData, Rucksack } from "../day3/day3.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 3: Rucksack Reorganization ---", () => {

  function get_input() {
    let input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('find diffs', () => {
    var rucksack = new Rucksack();

    expect(rucksack.findDiff(data[0])).toBe('p');
    expect(rucksack.findDiff(data[1])).toBe('L');
    expect(rucksack.findDiff(data[2])).toBe('P');
    expect(rucksack.findDiff(data[3])).toBe('v');
    expect(rucksack.findDiff(data[4])).toBe('t');
    expect(rucksack.findDiff(data[5])).toBe('s');
  }); 

  it('get priority', () => {
    var rucksack = new Rucksack();

    expect(rucksack.getPriority(rucksack.findDiff(data[0]))).toBe(16);
    expect(rucksack.getPriority(rucksack.findDiff(data[1]))).toBe(38);
    expect(rucksack.getPriority(rucksack.findDiff(data[2]))).toBe(42);
    expect(rucksack.getPriority(rucksack.findDiff(data[3]))).toBe(22);
    expect(rucksack.getPriority(rucksack.findDiff(data[4]))).toBe(20);
    expect(rucksack.getPriority(rucksack.findDiff(data[5]))).toBe(19);
  }); 

  it('sum priorities', () => {
    var rucksack = new Rucksack();

    expect(rucksack.sumPriorities(data)).toBe(157);
  }); 

  it('find badge in group', () => {
    var rucksack = new Rucksack();

    expect(rucksack.findBadgeInGroup(data[0], data[1], data[2])).toBe('r');
    expect(rucksack.findBadgeInGroup(data[3], data[4], data[5])).toBe('Z');
  }); 

  it('sum priorities in groups', () => {
    var rucksack = new Rucksack();

    expect(rucksack.sumPrioritiesInGroups(data)).toBe(70);
  }); 
});