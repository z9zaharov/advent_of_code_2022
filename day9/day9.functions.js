/**
 * --- Day 9: Rope Bridge ---
 */

function parseInputData(data) {
  return data.map(line => {
    const move = line.trim().split(' ');
    return {
      dir: move[0],
      steps: move[1]      
    }
  });
}

const RopeBridge = function () {

  this.Directions = {
    U: 'U',
    R: 'R',
    D: 'D',
    L: 'L'
  }

  this.getInitLongTail = () => {
    return new Array(9).fill(0).map(t => { return { y: 0, x: 0}});
  }

  this.getInitRopePos = () => {
    return [
      { y: 0, x: 0},
      { y: 0, x: 0}
    ];
  }

  this.Offsets = [
    [{dy:-1, dx:-1}, {dy:-1, dx:-1}, {dy:-1, dx: 0}, {dy:-1, dx: 1}, {dy:-1, dx: 1}],
    [{dy:-1, dx:-1}, {dy: 0, dx: 0}, {dy: 0, dx: 0}, {dy: 0, dx: 0}, {dy:-1, dx: 1}],
    [{dy: 0, dx:-1}, {dy: 0, dx: 0}, {dy: 0, dx: 0}, {dy: 0, dx: 0}, {dy: 0, dx: 1}],
    [{dy: 1, dx:-1}, {dy: 0, dx: 0}, {dy: 0, dx: 0}, {dy: 0, dx: 0}, {dy: 1, dx: 1}],
    [{dy: 1, dx:-1}, {dy: 1, dx:-1}, {dy: 1, dx: 0}, {dy: 1, dx: 1}, {dy: 1, dx: 1}],
  ];

  this.getOffset = (head, tail) => {
    const row = head.y - tail.y + 2;
    const col = head.x - tail.x + 2;
    
    return this.Offsets[row][col];
  }

  this.updateTailPos = (head, tail) => {
    const offset = this.getOffset(head, tail);
    tail.y = tail.y + offset.dy;
    tail.x = tail.x + offset.dx;
    return tail;
  }

  this.moveHead = (head, dir) => {
    switch (dir) {
      case this.Directions.U:
        head.y ++;
        break;
      case this.Directions.R:
        head.x ++;
        break;
      case this.Directions.D:
        head.y --;
        break;
      case this.Directions.L:
        head.x --;
        break;
      default:
    }
    return head;
  }

  this.makeStep = (head, tail, dir) => {
    head = this.moveHead(head, dir);
    return [head, this.updateTailPos(head, tail)];
  }

  this.makeLongStep = (head, tails, dir) => {
    head = this.moveHead(head, dir);
    this.updateTailPos(head, tails[0]);
    for (let i = 1; i < tails.length; i ++) {
      this.updateTailPos(tails[i - 1], tails[i]);
    }
    return head;
  }

  this.updateHistory = (tailPos, history) => {
    if (!history.some(pos => (pos.y == tailPos.y && pos.x == tailPos.x))) {
      history.push({...tailPos});
    }
  }

  this.makeMove = (head, tail, move, history) => {
    for(let i = 0; i < move.steps; i ++) {
      [head, tail] = this.makeStep(head, tail, move.dir);
      this.updateHistory(tail, history);
    }
    return [head, tail];
  }

  this.makeLongMove = (head, tails, move, history) => {
    for(let i = 0; i < move.steps; i ++) {
      head = this.makeLongStep(head, tails, move.dir);
      this.updateHistory(tails[tails.length - 1], history);
    }
    return [head, tails];
  }

  this.passRoute = (data) => {
    let [head, tail] = this.getInitRopePos();
    let history = [];
    data.forEach(move => {
      this.makeMove(head, tail, move, history);
    });
    return history.length;
  }

  this.passLongRoute = (data) => {
    let [head, tail] = this.getInitRopePos();
    let tails = this.getInitLongTail();
    let history = [];
    data.forEach(move => {
      [head, tails] = this.makeLongMove(head, tails, move, history);
    });
    return history.length;
  }
}

export { parseInputData, RopeBridge };
