/**
 * --- Day 5: Supply Stacks ---
 */

 function parseInputData(data, separator) {
  const moveRegex = /move[\s*](.\d*)[\s*]from[\s*](.\d*)[\s*]to[\s*](.\d*)/;

  const stacksConf = data[0].split(separator);
  const stackWidth = 4;
  const stacksCount = (stacksConf[stacksConf.length - 1].length + 1) / stackWidth;

  var stacks = new Array(stacksCount).fill(0).map(a => []);

  for (let i = stacksConf.length - 2; i >= 0; i --) {
    const stackLevel = stacksConf[i];
    var start = 0; var end = stackWidth;
    for(let j = 0; j < stacksCount; j ++) {
      const crate = stackLevel.substring(start, end).trim();
      if (crate.length > 0) {
        stacks[j].push(crate[1]);
      }
      start = end; end += stackWidth;
    }
  }

  return {
    stacks: stacks,
    moves: data[1].split(separator).map(line => {
      const cmd = line.match(moveRegex);
      return {
        move: parseInt(cmd[1]),
        from: parseInt(cmd[2]),
        to: parseInt(cmd[3])
      }
    })
  }
}

const CrateMover = function () {

  this.moveCmd = (stacks, cmd) => {
    for(let i = 0; i < cmd.move; i ++) {
      const crate = stacks[cmd.from - 1].pop();
      stacks[cmd.to - 1].push(crate);
    }
  }

  this.moveCmd9001 = (stacks, cmd) => {
    const from = stacks[cmd.from - 1].length - cmd.move;
    for(let i = 0; i < cmd.move; i ++) {
      const crate = stacks[cmd.from - 1][from + i];
      stacks[cmd.to - 1].push(crate);
    }
    for(let i = 0; i < cmd.move; i ++) {
      stacks[cmd.from - 1].pop();
    }
  }

  this.getMessageFromTops = (stacks, moves, moveFunc) => {
    moves.forEach(move => {
      moveFunc(stacks, move);
    });

    return stacks.reduce((message, stack) => {
      return message + ((stack.length > 0) ? stack[stack.length - 1] : '');
    }, '');
  }
}

export { parseInputData, CrateMover };