/**
 * --- Day 14: Regolith Reservoir ---
 */

function parseInputData(data) {
  return data.map(line => {
    let coords = line.split('->');
    return coords.reduce((path, coord) => {
      let point = { y: parseInt(coord.split(',')[1]), x: parseInt(coord.split(',')[0])};
      path.push(point);
      return path;
    }, []);
  });
}

const Regolith = function () {

  this.Types = {
    Empty: '.',
    Rock: '#',
    Stone: 'o',
    Out: 'x'
  };

  this.Start = { y: 0, x: 500 };

  this.getSize = (data) => {
    let maxX = 0;
    let maxY = 0;
    data.forEach((line => {
      line.forEach(point => {
        if (point.x > maxX) { 
          maxX = point.x;
        }
        if (point.y > maxY) {
          maxY = point.y;
        }
      })
    }));
    return { y: maxY+ 1, x: maxX + 1 };
  }

  this.isSolid = (data, point) => {
    let res = this.Types.Empty;
    for(let k = 0; k < data.length; k ++) {
      let line = data[k];
      for(let i = 1; i < line.length; i ++) {
        if(line[i - 1].y == line[i].y && line[i - 1].y == point.y && (line[i - 1].x <= point.x && line[i].x >= point.x || line[i].x <= point.x && line[i - 1].x >= point.x)
          || line[i - 1].x == line[i].x && line[i - 1].x == point.x && (line[i - 1].y <= point.y && line[i].y >= point.y || line[i].y <= point.y && line[i - 1].y >= point.y)
        )
        {
          return (line[i - 1].type) ? line[i - 1].type : this.Types.Rock;
        }
      }
    }
    return res;
  }

  this.isStone = (stones, point) => {
    return stones[point.y].indexOf(point.x) > -1;
  }

  this.getBelowPad = (rocks, stones, point, size, isInfinite = false) => {
    if (point.y + 1 >= size.y) {
      if (isInfinite) {
        return [ this.Types.Rock, this.Types.Rock, this.Types.Rock ];
      }
      else {
        return [ this.Types.Out, this.Types.Out, this.Types.Out ];
      }
    }

    return new Array(3).fill(this.Types.Out).map((p, i) => {
      let pointBelow = {y: point.y  + 1, x: point.x + i - 1 }; 
      return (this.isStone(stones, pointBelow)) ? this.Types.Stone : this.isSolid(rocks, pointBelow);
    });
  }

  this.nextCoord = (rocks, stones, point, size, isInfinite = false) => {
    let pad = this.getBelowPad(rocks, stones, point, size, isInfinite);;

    // bottom
    if (pad[1] == this.Types.Empty) {
      return { y: point.y + 1, x: point.x};
    }

    // if still
    if (pad.filter(p => p == this.Types.Rock || p == this.Types.Stone).length == 3) {
      return point;
    }
    // else check left
    if (pad[0] == this.Types.Empty) {
      return { y: point.y + 1, x: point.x - 1};
    }
    else if(pad[0] == this.Types.Out) {
      return { y: -1, x: -1};
    }
    // else check right
    if (pad[2] == this.Types.Empty) {
      return { y: point.y + 1, x: point.x + 1};
    }
    else if(pad[2] == this.Types.Out) {
      return { y: -1, x: -1};
    } 
  }

  this.stoneFall = (rocks, stones, size, isInfinite = false) => {
    let point = {y: this.Start.y, x: this.Start.x }

    let nextPoint = this.nextCoord(rocks, stones, point, size, isInfinite);
    while(nextPoint.y != -1 && (nextPoint.y != point.y || nextPoint.x != point.x)) {
      point = nextPoint;
      nextPoint = this.nextCoord(rocks, stones, point, size, isInfinite);
    }
    if (nextPoint.y != -1) {
      stones[point.y].push(point.x);
      return true;
    }
    return false;
  }

  this.fallToAbyss = (rocks) => {
    let size = this.getSize(rocks);
    let stones = new Array(size.y).fill('').map(a => []);

    let count = 0;
    while(this.stoneFall(rocks, stones, size)) {
      count ++;
    }
    return count;
  }

  this.fillFull = (rocks) => {
    let size = this.getSize(rocks);
    size.y = size.y + 1;
    let stones = new Array(size.y).fill('').map(a => []);

    let count = 0;
    while(!this.isStone(stones, this.Start)) {
      this.stoneFall(rocks, stones, size, true);
      count ++;
    }
    return count;
  }

  // for testing
  this.cutField = function (rocks, stones, y, x, point) {
    let subField = new Array(y).fill('').map((a) => new Array(x).fill(''));
    for(let i = 0; i < y; i ++) {
      for(let j = 0; j < x; j ++) {
        subField[i][j] = this.isStone(stones, { y: point.y + i, x: point.x + j}) ? this.Types.Stone : this.isSolid(rocks, { y: point.y + i, x: point.x + j});
      }
    }
    return subField;
  }
}

export { parseInputData, Regolith };
