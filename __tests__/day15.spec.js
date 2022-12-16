import { expect } from "@jest/globals";
import { parseInputData, Beacon } from "../day15/day15.functions.js";
import { split_blocks } from '../utils/utils';

describe.only("--- Day 15: Beacon Exclusion Zone ---", () => {

  function get_input() {
    let input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('test reachable', () => {
    let beacon = new Beacon();

    let reachable = data.map(sensor => beacon.getReachable(sensor, 10)).filter(d => d != undefined);
    expect(reachable.length).toBe(6);
  });


  it('test coverage', () => {
    let beacon = new Beacon();

    let distances = [ 
      {from: 12, to: 12}, {from: 2, to: 14}
    ];
    let coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}]));

    distances = [
      {from: 12, to: 12}, {from: 2, to: 14}, {from: 2, to: 2}
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}]));

    distances = [
      {from: 2, to: 14}, {from: -2, to: 2}
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, {from: -2, to: 1}]));

    distances = [
      {from: 2, to: 14}, {from: 14, to: 18}, {from: 16, to: 24},
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, {from: 15, to: 18}, {from: 19, to: 24}]));

    distances = [
      { from: 12, to: 12 }, { from: 2, to: 14 }, { from: 2, to: 2 }, { from: -2, to: 2 }
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, {from: -2, to: 1}]));

    distances = [
      { from: 12, to: 12 }, { from: 2, to: 14 }, { from: 2, to: 2 }, { from: -2, to: 2 }, { from: 16, to: 24 }
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, {from: -2, to: 1}, { from: 16, to: 24 }]));

    distances = [
      { from: 2, to: 14 }, { from: 16, to: 24 }, { from: 14, to: 18 }
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, { from: 16, to: 24 }, { from: 15, to: 15 }]));

    distances = [
      { from: 12, to: 12 }, { from: 2, to: 14 }, { from: 2, to: 2 }, { from: -2, to: 2 }, { from: 16, to: 24 }, { from: 14, to: 18 }
    ];
    coverage = beacon.merge(distances);
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, {from: -2, to: 1}, { from: 16, to: 24 }, { from: 15, to: 15 }]));
  });

  it('get beacons for row', () => {
    let beacon = new Beacon();

    let res = beacon.getBeaconsX(data, 10);
    expect(res).toEqual(expect.arrayContaining([2]))
  });

  it('test coverage', () => {
    let beacon = new Beacon();

    let res = beacon.countRowCoverage(data, 10)[0];
    expect(res).toBe(26);
  });

  it('limit coverage', () => {
    let beacon = new Beacon();

    let reachable = data.map(sensor => beacon.getReachable(sensor, 10)).filter(d => d != undefined);
    let coverage = beacon.merge(reachable);
    beacon.limitCoverage(coverage, 0, 20);    
    expect(coverage).toEqual(expect.arrayContaining([{from: 2, to: 14}, {from: 0, to: 1}, { from: 16, to: 20 }, { from: 15, to: 15 }]));
  });

  it('find beacon', () => {
    let beacon = new Beacon();

    let res = beacon.findHiddenBeaconPos(data, 0, 0, 20, 20);
    expect(res).toMatchObject({y: 11, x: 14});
  });

  it('tuning frequency', () => {
    let beacon = new Beacon();

    let res = beacon.getTuningFrequency(data, 0, 0, 20, 20);
    expect(res).toBe(56000011);
  });
})