/**
 * --- Day 3: Rucksack Reorganization ---
 */

 function parseInputData(data) {
  return data;
}

const Rucksack = function () {

  this.findDiff = (line) => {
    let size = line.length / 2;

    let compartment1 = line.substring(0, size);
    let compartment2 = line.substring(size);

    for(let i = 0; i < size; i ++) {
      const item = compartment1[i];
      const idx = compartment2.indexOf(item);
      if (idx > -1) {
        return item;
      }
    }
  }

  this.findBadgeInGroup = (rucksack1, rucksack2, rucksack3) => {
    for (let i = 0; i < rucksack1.length; i ++) {
      const item = rucksack1[i];
      if(rucksack2.indexOf(item) > -1 && rucksack3.indexOf(item) > -1) {
         return item;
      }
    }
  }

  this.getPriority = (item) => {
    if (item >= 'a' && item <= 'z') {
      return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    else if (item >= 'A' && item <= 'Z') {
      return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
    }
  }

  this.sumPriorities = (data) => {
    return data.reduce((sum, line) => {
      let diff = this.findDiff(line);
      return sum + this.getPriority(diff);
    }, 0);
  }

  this.sumPrioritiesInGroups = (data) => {
    let sum = 0;
    
    for(let i = 0; i < data.length; i += 3) {
      let badge = this.findBadgeInGroup(data[i], data[i + 1], data[i + 2]);
      sum = sum + this.getPriority(badge);
    }

    return sum;
  }
}

export { parseInputData, Rucksack };