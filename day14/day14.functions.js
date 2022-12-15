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
    return { y: maxY + 1, x: maxX + 1 };
  }

  this.getSizeExtended = (data) => {
    let size = this.getSize(data);



    return {y: size.y + 2, x: size.x };
  }

  this.initField = (maxY, maxX) => {
    return new Array(maxY).fill(this.Types.Empty).map(a => new Array(maxX).fill(this.Types.Empty));
  }

  this.fill = (data, field) => {
    data.forEach((line => {
      for(let i = 1; i < line.length; i++) {
        
        let distanceX = line[i - 1].x - line[i].x;
        let dirX = (distanceX > 0) ? -1 : 1;

        let distanceY = line[i - 1].y - line[i].y;
        let dirY = (distanceY > 0) ? -1 : 1;

        let y = line[i - 1].y;
        for (let x = 0; x <= Math.abs(distanceX); x ++) {
          field[y][line[i - 1].x + x * dirX] = this.Types.Rock;
        }

        let x = line[i - 1].x;
        for (let y = 0; y <= Math.abs(distanceY); y ++) {
          field[line[i - 1].y + y * dirY][x] = this.Types.Rock;
        }
      }
    }));
  }

  this.fillExtended = (data, field) => {
    this.fill(data, field);
    for(let i = 0; i < field[field.length - 1].length; i ++) {
      field[field.length - 1][i] = this.Types.Rock;
    }
  }

  this.getBelowPad = (field, point) => {
    if (point.y >= field.length - 1) {
      return [ this.Types.Out, this.Types.Out, this.Types.Out ];
    }
    return [
       (point.x - 1 >= 0) ? field[point.y + 1][point.x - 1] : this.Types.Out,
      field[point.y + 1][point.x],
      (point.x + 1 < field[point.y + 1].length) ? field[point.y + 1][point.x + 1] : this.Types.Out,
    ];
  }

  this.isSolid = (data, point) => {
    data.forEach((line => {

      if (line[i - 1].y == line[i].y && (line[i - 1].x <= point.x && line[i].x >= point.x || line[i].x <= point.x && line[i - 1].x >= point.x)
        || line[i - 1].x == line[i].x && (line[i - 1].y <= point.y && line[i].y >= point.y || line[i].y <= point.y && line[i - 1].y >= point.y)
        )
        {
          return true;
        }
    }));
    return false;
  }

  this.getBelowPad2 = (field, point) => {
    return new Array(3).fill(this.Types.Out).map((p, i) => {
      return (this.isSolid(field, {y: point.y  + 1, x: point.x + i - 1 })) ? this.Types.Rock : this.Types.Empty;
    });
  }

  this.nextCoord = (field, size, point) => {

  }

  this.nextCoord = (field, point) => {
    let pad = this.getBelowPad(field, point);

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

  this.stoneFall = (field) => {
    let point = {y: this.Start.y, x: this.Start.x }

    let nextPoint = this.nextCoord(field, point);
    while(nextPoint.y != -1 && nextPoint != point) {
      point = nextPoint;
      nextPoint = this.nextCoord(field, point);
    }
    if (nextPoint.y != -1) {
      field[nextPoint.y][nextPoint.x] = this.Types.Stone;
      return true;
    }
    return false;
  }

  this.fallToAbyss = (data) => {
    let size = this.getSize(data);
    let field = this.initField(size.y, size.x);
    this.fill(data, field);

    let count = 0;
    while(this.stoneFall(field)) {
      count ++;
    }
    return count;
  }

  // for testing
  this.cutField = function (field, y, x, point) {
    let subField = new Array(y).fill('').map((a) => new Array(x).fill(''));
    for(let i = 0; i < y; i ++) {
      for(let j = 0; j < x; j ++) {
        subField[i][j] = (point) ? field[point.y + i][point.x + j] : field[i][j];
      }
    }
    return subField;
  }
}

export { parseInputData, Regolith };
