/**
 * --- Day 17: Pyroclastic Flow ---
 */

function parseInputData(data) {
  return data;
}

const FlyingRocks = function () {

  this.MoveTypes = {
    Left: '<',
    Right: '>'
  };

  this.FieldType = {
    Empty: '.',
    Rock: '#'
  }

  this.Rocks = {
    HorBar: [0b1111, 0b0000, 0b0000, 0b0000],
    Cross: [0b0100, 0b1110, 0b0100, 0b0000],
    MirroredL: [0b0010, 0b0010, 0b1110, 0b0000],
    VertBar: [0b1000, 0b1000, 0b1000, 0b1000],
    Square: [0b1100, 0b1100, 0b0000, 0b0000]
  }

  this.isInBoundary = (rock, move) => {
    return rock.every(line => {
      if (move == this.MoveTypes.Left) {
        return (((line << 1) & 0b01111111) >> 1) == line;
      }
      else {
        return ((line >> 1) << 1) == line;
      }
    });
  }

  this.shifted = (rock, move) => {
    return (this.isInBoundary(rock, move)) ? [...rock].map(line => (move == this.MoveTypes.Left) ? ((line << 1) & 0b01111111) : line >> 1) : rock;
  }

  this.onShift = (rock, move, field) => {
    let newRock = this.shifted(rock, move);
    return (newRock.every((line, i) => line == 0 || line > 0 && field.length > i && ((field[i] ^ line) & line) == line)) ? newRock : rock;
  }

  this.canFall = (rock, field) => {
    return rock.every((line, i) => line == 0 || line > 0 && (field.length > i + 1) && ((field[i + 1] ^ line) & line) == line);
  }

  this.stillRock = (point, field) => {
    for(let i = 0; i < point.length; i ++) {
      if (point[i] > 0) {
        field[i] = field[i] | point[i];
      }
    }
  }

  this.addNewRock = (type, field = []) => {
    let point = this.shifted(this.Rocks[type], this.MoveTypes.Left);
    let linesFilled = point.filter(line => line != 0).length;
    for(let i = 0; i < linesFilled + 3; i ++) {
      field.unshift(0);
      field[0] = 0b10000000;
    }

    return point;
  }

  this.makeStep = (point, move, field = []) => {
    point = this.onShift(point, move, field);
    if(this.canFall(point, field)) {
//      if (((field[0] << 1) & 0b01111111) == 0) {
      if ((field[0] & 0b01111111) == 0) {
          field.splice(0, 1);
        return point;
      }
      else {
        point.unshift(0);
        point[0] = 0;
        return point;
      }
    }
    else {
      this.stillRock(point, field);
      return false;
    }
  }

  this.fall = (point, moves, currentMove, field) => {
    while (point) {
      point = this.makeStep(point, moves[currentMove], field);
      currentMove = (currentMove + 1) % moves.length;
//      console.log("moves " + moves.length + " current move: " + currentMove + " field.length " + field.length);
    }
    return currentMove;
  }


  this.fallRocks = (moves, maxCount, currentMove = 0, currentType = 0, field = []) => {

    let point = '';
    let count = 0;

    let toSub = field.length;

    while(count < maxCount) {
      let type = Object.keys(this.Rocks)[currentType];
      point = this.addNewRock(type, field);

      currentMove = this.fall(point, moves, currentMove, field);
      count ++;

      currentType = (currentType + 1) % Object.keys(this.Rocks).length;

      if (((field[2] & 0b11111111) == 0b11111111)) {
        console.log(count + " " + currentMove + " " + currentType + " " + field.length);
        // console.log(field[0]);
        // console.log(field[1]);
      }
    }

    return field.length - toSub;
  }

  this.drawField = (point, field) => {
    this.stillRock(point, field);
    let visibleField = new Array(field.length).fill('').map(line => new Array(7).fill(this.FieldType.Empty));
    for(let i = 0; i < field.length; i ++) {
      let line = (field[i] & 0b01111111);
      let j = 6;
      while(line > 0) {
        if (line != ((line >> 1) << 1)) {
          visibleField[i][j] = this.FieldType.Rock;
        }
        line = line >> 1;
        j --;
      }
    }
    return visibleField;
  }
}


export { parseInputData, FlyingRocks };
