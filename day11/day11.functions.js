/**
 * --- Day 11: Monkey in the Middle ---
 */

function parseInputData(data, separator) {
  return data.map(block =>  {
    let lines = block.split(separator);

    let parseOperation = (op) => {
      let clause = op.split('=')[1].trim().split(' ');
      return {
        left: clause[0],
        op: clause[1],
        right: clause[2]
      };
    }

    return {
      items: lines[1].split(':')[1].trim().split(',').map(item => parseInt(item.trim())),
      operation: parseOperation(lines[2].split(':')[1].trim()),
      test: parseInt(lines[3].split(':')[1].trim().substring('divisible by'.length).trim()),
      ifTrue: parseInt(lines[4].split(':')[1].trim().substring('throw to monkey'.length).trim()),
      ifFalse: parseInt(lines[5].split(':')[1].trim().substring('throw to monkey'.length).trim()),
      inspections: 0
    }
  });
}

const MonkeyBusiness = function () {

  this.Operations = {
    Add: '+',
    Mult: '*'
  }

  this.calcOperation = (item, operation) => {
    let left = 0;
    if (operation.left == 'old') {
      left = parseInt(item);
    }
    let right = (operation.right == 'old') ? item : operation.right;
    return (operation.op == this.Operations.Add) ? left  + parseInt(right) : left * parseInt(right);
  }

  this.test = (level, test) => {
    return (level % test) == 0;
  }

  this.inspectItem = (monkey, item, divisor, relief = 3) => {
    monkey.inspections ++;
    let worryLevel = Math.floor(this.calcOperation(item, monkey.operation) / relief) % divisor;
    return (this.test(worryLevel, monkey.test)) ? [monkey.ifTrue, worryLevel] : [monkey.ifFalse, worryLevel];
  }

  this.addItem = (monkey, item) => {
    monkey.items.push(item);
  }

  this.inspections = (id, monkeys, divisor, relief = 3) => {
    monkeys[id].items.forEach(item => {
      let [targetId, level] = this.inspectItem(monkeys[id], item, divisor, relief);
      this.addItem(monkeys[targetId], level);
    });
    monkeys[id].items = [];
  }

  this.round = (monkeys, relief = 3) => {
    let divisor = this.commonDivisor(monkeys);
    monkeys.forEach((monkey, i) => {
      this.inspections(i, monkeys, divisor, relief);
    });
  }

  this.makeRounds = (monkeys, count, relief = 3) => {
    for (let i = 0; i < count; i ++) {
      this.round(monkeys, relief);
    }
  }

  this.commonDivisor = (monkeys) => {
    return monkeys.reduce((total, monkey) => {
      return total * monkey.test;
    }, 1);
  }

  this.monkeyBusiness = (monkeys, count, relief = 3) => {
    this.makeRounds(monkeys, count, relief);

    let inspections = monkeys.map(monkey => monkey.inspections).sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0);
    return inspections[inspections.length - 1] * inspections[inspections.length - 2];
  }
}

export { parseInputData, MonkeyBusiness };
