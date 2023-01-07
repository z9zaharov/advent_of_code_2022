/**
 * --- Day 21: Monkey Math ---
 */

function parseInputData(data) {
  return data.reduce((prg, line) => {
    let label = line.split(':')[0].trim();
    let cmd = line.split(':')[1].trim().split(' ');
    if (cmd.length == 1) {
      prg[label] = isNaN(parseInt(cmd[0])) ? cmd[0] : parseInt(cmd[0]);
    }
    else {
      prg[label] = {
        left: isNaN(parseInt(cmd[0])) ? cmd[0] : parseInt(cmd[0]),
        op: cmd[1],
        right: isNaN(parseInt(cmd[2])) ? cmd[2] : parseInt(cmd[2])
      }
    }
    return prg;
  }, {});
}

const MonkeyMath = function () {

  this.Operations = {
    Mult: '*',
    Divide: '/',
    Sum: '+',
    Minus: '-'
  }

  this.getStack = (prg, label, stack = []) => {
    let cmd = prg[label];
    if (typeof cmd === 'object' && cmd !== null) {
      stack.push(cmd.left);
      this.getStack(prg, cmd.left, stack);
      stack.push(cmd.right);
      this.getStack(prg, cmd.right, stack);
    }
    stack.push(cmd);
  }

  this.equalityParts = (prg) => {
    let stackLeft = [];
    let stackRight = [];

    this.getStack(prg, prg['root'].left, stackLeft);
    this.getStack(prg, prg['root'].right, stackRight);

    if (stackLeft.some(label => label == 'humn')) {
      return { const: prg['root'].right, calc: prg['root'].left };
    }
    else {
      return { const: prg['root'].left, calc: prg['root'].right };
    }
  }

  this.getEquality = (prg, labelConst, labelCalculate) => {
    let constant = this.calculate(prg, labelConst);

    let prev = 1;
    prg['humn'] = prev;
    let prevSign = constant - this.calculate(prg, labelCalculate);

    // expand multiplying to 2 to get distance where sign changes
    let next = prev * 2;
    prg['humn'] = next;
    let nextSign = constant - this.calculate(prg, labelCalculate);
    while(nextSign * prevSign > 0) {
      prev = next;
      prevSign = nextSign;

      next = prev * 2;
      prg['humn'] = next;
      nextSign = constant - this.calculate(prg, labelCalculate);
    }

    // divide the distance between prev and next checking in which side the sign has changed until the sign is 0
    let val = prev;
    let sign = prevSign;
    while(sign != 0) {
      val = Math.round(prev + (next - prev) / 2);

      prg['humn'] = val;
      sign = constant - this.calculate(prg, labelCalculate);

      if (prevSign * sign > 0 && sign * nextSign < 0) {
        prevSign = sign;
        prev = val;
      }
      else {
        nextSign = sign;
        next = val;
      }
    }

   return val;
  }


  this.calculate = (prg, label) => {
    let cmd = prg[label];
    if (typeof cmd === 'object' && cmd !== null) {
      switch (cmd.op) {
        case this.Operations.Mult:
          return this.calculate(prg, cmd.left) * this.calculate(prg, cmd.right);
          break;
        case this.Operations.Divide:
          return this.calculate(prg, cmd.left) / this.calculate(prg, cmd.right);
          break;
        case this.Operations.Sum:
          return this.calculate(prg, cmd.left) + this.calculate(prg, cmd.right);
          break;
        case this.Operations.Minus:
          return this.calculate(prg, cmd.left) - this.calculate(prg, cmd.right);
          break;
      }
    }

    return cmd;
  }
}

export { parseInputData, MonkeyMath };
