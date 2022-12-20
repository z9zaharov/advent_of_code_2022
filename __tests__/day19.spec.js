import { expect } from "@jest/globals";
import { parseInputData, Minerals } from "../day19/day19.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 19: Not Enough Minerals ---", () => {

  function get_input() {
    let input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('check parse input', () => {
    expect(data.length).toBe(2);
    expect(data[0]).toMatchObject({ ore: { ore: 4}, clay: { ore: 2 }, obsidian: { ore: 3, clay: 14}, geode: { ore: 2, obsidian: 7}});
    expect(data[1]).toMatchObject({ ore: { ore: 2}, clay: { ore: 3 }, obsidian: { ore: 3, clay: 8}, geode: { ore: 3, obsidian: 12}});
  });

  it('check resources', () => {
    let minerals = new Minerals();

    let resources = {ore: 1};
    let res = minerals.canProduce({'ore': 2}, resources);
    expect(res).toBe(false);

    resources = {ore: 2};
    res = minerals.canProduce({'ore': 2}, resources);
    expect(res).toBe(true);

    resources = {ore: 3, clay: 14};
    res = minerals.canProduce({ore: 3, clay: 14}, resources);
    expect(res).toBe(true);
  });

  it('produce', () => {
    let minerals = new Minerals();

    let resources = {ore: 2};
    let res = minerals.produce({'ore': 2}, {}, resources, 'clay');
    expect(resources).toMatchObject({ore: 0});

    resources = {ore: 3, clay: 14};
    let robots = {};
    res = minerals.produce({ore: 3, clay: 14}, robots, resources, 'obsidian');
    expect(resources).toMatchObject({ore: 0, clay: 0});
    expect(robots).toMatchObject({obsidian: 1});

    resources = {ore: 4};
    robots = {ore: 1};
    res = minerals.produce({ore: 4}, robots, resources, 0);
    expect(resources).toMatchObject({ore: 4});
    console.log(robots);
    expect(robots).toMatchObject({ore: 1});
  });

  it.only('mine', () => {
    let minerals = new Minerals();

    let resources = {ore: 4};
    let robots = {ore: 1};
    console.log('before mine');
    console.log(data[0]);
    console.log(" resources: " + Object.keys(resources) + " " + Object.values(resources) + " robots: " + Object.keys(robots) + " " + Object.values(robots));

    let res = minerals.mine(data[0], robots, resources, 'ore');

    console.log('after mine');
    console.log(" resources: " + Object.keys(resources) + " " + Object.values(resources) + " robots: " + Object.keys(robots) + " " + Object.values(robots));
console.log(resources);
    expect(resources).toMatchObject({ore: 1});
    expect(robots).toMatchObject({ore: 2});
  });

  xit('mine steps', () => {
    let minerals = new Minerals();

    let resources = {};
    let robots = {ore: 1}

    // == Minute 1 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1});
    expect(resources).toMatchObject({ore: 1});
    // == Minute 2 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1});
    expect(resources).toMatchObject({ore: 2});
    // == Minute 3 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1, clay: 1});
    expect(resources).toMatchObject({ore: 1, clay: 0});
    // == Minute 4 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1, clay: 1});
    expect(resources).toMatchObject({ore: 2, clay: 1});
    // == Minute 5 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1, clay: 2});
    expect(resources).toMatchObject({ore: 1, clay: 2});
    // == Minute 6 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1, clay: 2});
    expect(resources).toMatchObject({ore: 2, clay: 4});
    // == Minute 7 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1, clay: 3});
    expect(resources).toMatchObject({ore: 1, clay: 6});
    // == Minute 8 ==
    minerals.mineStep(data[0], robots, resources);
    expect(robots).toMatchObject({ore: 1, clay: 3});
    expect(resources).toMatchObject({ore: 2, clay: 9});
    // // == Minute 9 ==
    // minerals.mineStep(data[0], robots, resources);
    // expect(robots).toMatchObject({ore: 1, clay: 3});
    // expect(resources).toMatchObject({ore: 3, clay: 12});
  });

  xit('mine', () => {
    let minerals = new Minerals();

    let res = minerals.collectOptimal(data[0], 24);
    expect(res).toBe(9);
  });
})