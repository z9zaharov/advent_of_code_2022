import { expect } from "@jest/globals";
import { parseInputData, CommDevice } from "../day6/day6.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 6: Tuning Trouble ---", () => {

  function get_input() {
    let input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('get marker pos', () => {
    var device = new CommDevice();

    expect(device.findMarkerPos(data[0], device.MARKER_LENGTH)).toBe(7);
  }); 

  it('get marker pos1', () => {
    var device = new CommDevice();

    let data = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
    expect(device.findMarkerPos(data, device.MARKER_LENGTH)).toBe(5);

    data = 'nppdvjthqldpwncqszvftbrmjlhg';
    expect(device.findMarkerPos(data, device.MARKER_LENGTH)).toBe(6);

    data = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
    expect(device.findMarkerPos(data, device.MARKER_LENGTH)).toBe(10);

    data = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
    expect(device.findMarkerPos(data, device.MARKER_LENGTH)).toBe(11);
  });

  it('get message pos', () => {
      var device = new CommDevice();
  
      expect(device.findMarkerPos(data[0], device.MESSAGE_LENGTH)).toBe(19);

      data = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
      expect(device.findMarkerPos(data, device.MESSAGE_LENGTH)).toBe(23);
  
      data = 'nppdvjthqldpwncqszvftbrmjlhg';
      expect(device.findMarkerPos(data, device.MESSAGE_LENGTH)).toBe(23);
  
      data = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
      expect(device.findMarkerPos(data, device.MESSAGE_LENGTH)).toBe(29);
  
      data = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
      expect(device.findMarkerPos(data, device.MESSAGE_LENGTH)).toBe(26);
  }); 
})