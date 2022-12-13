/**
 * --- Day 13: Distress Signal ---
 */

function parseInputData(data, separator) {
  return data.map(block =>  {
    let lines = block.split(separator);
    return {
      left: JSON.parse(lines[0].trim()),
      right: JSON.parse(lines[1].trim())
    }
  });
}

const DistressSignal = function () {
  this.Brackets = {
    Open: '[',
    Close: ']'
  };

  this.parseLine = (line) => {
    let brackets = [];
    let stack = [];
    let i = 0;
    while (i < line.length) {
      if (line[i] == this.Brackets.Open) {
        brackets.push(i);
        i ++;
      }
      else if (line[i] != this.Brackets.Close) {
        i ++;
      }
      else if (line[i] == this.Brackets.Close) {
        let bracketIdx = brackets.pop();
        let expression = line.substr(bracketIdx + 1, i - bracketIdx - 1);
        let elements = expression.split(',');
        let children = [];

        // since expressions will pop from the stack $<idx> has to be ajdusted with the count of elements already popped
        let exprCount = 0; 
        for(let i = 0; i < elements.length; i ++) {
          let el = elements[i];
          if (el.length > 0 ) {
            children.push((el[0] != '$') ? parseInt(el) : stack.splice(el.substr(1) - (exprCount++), 1)[0]);
          }
        }
        stack.push(children);

        let linePrefix = line.substr(0, bracketIdx);
        let lineSuffix = line.substr(i + 1);
        line = linePrefix + '$' + (stack.length - 1) + lineSuffix;
        i = bracketIdx;
      }
    }

    let obj = stack[0];
    return obj;
  }


  this.compare = (left, right) => {
    if (Number.isInteger(left) && Number.isInteger(right)) {
        return left - right;
    }
    else if (Number.isInteger(left)) {
      return this.compare([left], right);
    }
    else if (Number.isInteger(right)) {
      return this.compare(left, [right]);
    }

    for(let i = 0; i < left.length; i ++) {
      if (i >= right.length) {
        return 1;
      }

      let res = this.compare(left[i], right[i]);
      if (res != 0) {
        return res;
      }
    }

    return left.length - right.length;
  }

  this.countRight = (data) => {
    return data.reduce((sum, pair, i) => {
      return (this.compare(pair.left, pair.right) < 0) ? sum + (i + 1) : sum;
    }, 0);
  }

  this.decoderKey = (data) => {
    let key2 = 1;
    let key6 = 2;

    const arr2 = [[2]];
    const arr6 = [[6]];

    data.forEach(pair => {
      if (this.compare(pair.left, arr2) < 0) {
        key2 ++;
        key6 ++;
      }
      else if (this.compare(pair.left, arr6) < 0) {
        key6 ++;
      }

      if (this.compare(pair.right, arr2) < 0) {
        key2 ++;
        key6 ++;
      }
      else if (this.compare(pair.right, arr6) < 0) {
        key6 ++;
      }
    });

    return key2 * key6;
  }
}

export { parseInputData, DistressSignal };
