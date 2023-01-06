/**
 * --- Day 22: Monkey Map ---
 */

function parseInputData(data, separator) {
  let map = data[0].split(separator);

  let sectors = [];
  let size = map[0].length / 4;
  sectors.push({y: 0, x: size * 2, size: size}); // 1
  sectors.push({y: size, x: 0, size: size}); // 2
  sectors.push({y: size, x: size, size: size}); // 3
  sectors.push({y: size, x: size * 2, size: size}); // 4
  sectors.push({y: size * 2, x: size * 2, size: size}); // 5
  sectors.push({y: size * 2, x: size * 3, size: size}); // 6

  let route = [];
  const regex = /([0-9]+)([RL]?)+/g;
  data[1].match(regex).forEach(pair => {
    let dirIdx = pair.search(/[RL]/);
    if (dirIdx > -1) {
      route.push({steps: parseInt(pair.substr(0, dirIdx)), dir: pair.substr(dirIdx)});
    }
    else {
      route.push({steps: parseInt(pair), dir: ''});
    }
  });
  return { map: map, route: route, sectors: sectors };
}

const MonkeyMap = function () {

  this.Tiles = {
    Skip: ' ',
    Empty: '.',
    Wall: '#'
  }

  this.Moves = {
    R: 'R',
    L: 'L',
  }

  this.getSectors = (map) => {
    let size = (map.length > map[0].length) ? map.length - map[0].length : map[0].length - map.length;

    let sectors = [];
    if (map.length > map[0].length) {
      sectors.push({y: size, x: size, size: size}); // 1
      sectors.push({y: size * 2, x: 0, size: size}); // 2
      sectors.push({y: size * 2, x: size, size: size}); // 3
      sectors.push({y: 0, x: size, size: size}); // 4
      sectors.push({y: 0, x: size * 2, size: size}); // 5
      sectors.push({y: size * 3, x: 0, size: size}); // 6
    }
    else {
      sectors.push({y: 0, x: size * 2, size: size}); // 1
      sectors.push({y: size, x: 0, size: size}); // 2
      sectors.push({y: size, x: size, size: size}); // 3
      sectors.push({y: size, x: size * 2, size: size}); // 4
      sectors.push({y: size * 2, x: size * 2, size: size}); // 5
      sectors.push({y: size * 2, x: size * 3, size: size}); // 6
    }

    return sectors;
  }

  this.getSector = (sectors, pos) => {
    return sectors
      .map((sector, i) => {return { sector, idx: i}})
      .filter(s => (pos.y >= s.sector.y && pos.y < s.sector.y + s.sector.size && pos.x >= s.sector.x && pos.x < s.sector.x + s.sector.size)
    ).map(s => s.idx);
  }

  this.moveToSector = (sectors, prevSector, pos, direction) => {
    let {dy, dx} = direction;
    let {y, x} = pos;

    let size = sectors[0].size

    switch(prevSector) {
      // sector 1
      case 0:
        if (dy == -1 && dx == 0) { // toward sector 2
          y = sectors[1].y - (pos.y - sectors[0].y);
          x = sectors[1].x + size - (pos.x - sectors[0].x);
          [dy, dx] = [-dy + 0, dx];
        }
        else if(dy == 0 && dx == -1) { // toward sector 3
          y = sectors[2].y;
          x = sectors[2].x + (pos.y - sectors[0].y);
          [dy, dx] = [-dx + 0, dy];
        }
        else if (dy == 0 && dx == 1) { // toward sector 6
          y = sectors[5].y + size - 1 - (pos.y - sectors[0].y);
          x = sectors[5].x + size - 1;
          [dy, dx] = [dy, -dx + 0];
        }
        break;
      // sector 2
      case 1: 
        if(dy == -1 && dx == 0) { // toward sector 1
          y = sectors[0].y + (pos.y - sectors[1].y);
          x = sectors[0].x + size - (pos.x - sectors[1].x) - 1;
          [dy, dx] = [-dy + 0, dx];
        }
        else if(dy == 0 && dx == -1) { // toward sector 6
          y = sectors[5].y + size - 1;
          x = sectors[5].x + size - 1 - (pos.y - sectors[1].y);
          [dy, dx] = [dx, dy];
        }
        else if (dy == 1 && dx == 0) { // toward sector 5
          y = sectors[4].y + (pos.y - sectors[1].y);
          x = sectors[4].x + size - 1 - (pos.x - sectors[1].x);
          [dy, dx] = [-dy, dx];
        }
        break;
      // sector 3
      case 2:
        if (dy == -1 && dx == 0) { // toward sector 1
          y = (pos.x - sectors[2].x);
          x = sectors[0].x;
          [dy, dx] = [dx, -dy + 0];
        }
        else if (dy == 1 && dx == 0) { // toward sector 5
          y = sectors[4].x + size - 1 - (pos.x - sectors[2].x);
          x = sectors[4].x;
          [dy, dx] = [dx, dy];
        }
        break;
      // sector 4
      case 3:
        if (dy == 0 && dx == 1) { // toward sector 6
          y = sectors[5].y;
          x = sectors[5].x + size - (pos.y - sectors[3].y) - dx;
          [dy, dx] = [dx, dy];
        }
        break;
      // sector 5
      case 4:
        if (dy == 0 && dx == -1) { // toward sector 3
          y = sectors[2].y + size + dx;
          x = sectors[2].x + size - 1 - (pos.y - sectors[4].y);
          [dy, dx] = [dx, dy];
        }
        else if (dy == 1 && dx == 0) { // toward sector 2
          y = sectors[1].y + size - 1;
          x = sectors[1].x + size - 1 - (pos.x - sectors[4].x);
          [dy, dx] = [-dy + 0, dx];
        }
        break;
      // sector 6
      case 5:
        if (dy == -1 && dx == 0) { // toward sector 4
          y = sectors[3].y + size - 1 - (pos.x - sectors[5].x);
          x = sectors[3].x + size - 1;
          [dy, dx] = [dx, dy];
        }
        else if (dy == 0 && dx == 1) { // toward sector 1
          y = sectors[0].y + size - 1 - (pos.y - sectors[5].y);
          x = sectors[0].x + size - 1;
          [dy, dx] = [dy, -dx + 0];
        }
        else if (dy == 1 && dx == 0) { // toward sector 2
          y = sectors[1].y + size - 1 - (pos.x - sectors[5].x);
          x = sectors[1].x;
          [dy, dx] = [dx, dy];
        }
        break;
      }

      return {y, x, direction: {dy, dx}};
  }

  this.moveToSector2 = (sectors, prevSector, pos, direction) => {
    let {dy, dx} = direction;
    let {y, x} = pos;

    let size = sectors[0].size

    switch(prevSector) {
      // sector 1
      case 0:
        if (dy == 0 && dx == -1) { // toward sector 2
          y = sectors[1].y;
          x = sectors[1].x + (pos.y - sectors[0].y);
          [dy, dx] = [-dx + 0, dy];
        }
        else if(dy == 0 && dx == 1) { // toward sector 5
          y = sectors[4].y + size - 1;
          x = sectors[4].x + (pos.y - sectors[0].y);
          [dy, dx] = [-dx + 0, dy];
        }
        break;
      // sector 2
      case 1: 
        if(dy == -1 && dx == 0) { // toward sector 1
          y = sectors[0].y + (pos.x - sectors[1].x);
          x = sectors[0].x;
          [dy, dx] = [dx, -dy + 0];
        }
        else if (dy == 0 && dx == -1) { // toward sector 4
          y = sectors[3].y + size - (pos.y - sectors[1].y) - 1;
          x = sectors[3].x;
          [dy, dx] = [dy, -dx + 0];
        }
        break;
      // sector 3
      case 2:
        if (dy == 0 && dx == 1) { // toward sector 5
          y = sectors[4].y + size - 1 - (pos.y - sectors[2].y);
          x = sectors[4].x + size - 1;
          [dy, dx] = [dy, -dx + 0];
        }
        else if (dy == 1 && dx == 0) { // toward sector 6
          y = sectors[5].y + (pos.x - sectors[2].x);
          x = sectors[5].x + size - 1;
          [dy, dx] = [dx, -dy + 0];
        }
        break;
      // sector 4
      case 3:
        if (dy == 0 && dx == -1) { // toward sector 2
          y = sectors[1].y + size - 1 - (pos.y - sectors[3].y);
          x = sectors[1].x;
          [dy, dx] = [dy, -dx + 0];
        }
        else if (dy == -1 && dx == 0) { // toward sector 6
          y = sectors[5].y + (pos.x - sectors[3].x);
          x = sectors[5].x;
          [dy, dx] = [dx, -dy + 0];
        }
        break;
      // sector 5
      case 4:
        if (dy == 1 && dx == 0) { // toward sector 1
          y = sectors[0].y + (pos.x - sectors[4].x);
          x = sectors[0].x + size - 1;
          [dy, dx] = [dx, -dy + 0];
        }
        else if (dy == 0 && dx == 1) { // toward sector 3
          y = sectors[2].y + size - 1 - (pos.y - sectors[4].y);
          x = sectors[2].x + size - 1;
          [dy, dx] = [dy, -dx + 0];
        }
        else if (dy == -1 && dx == 0) { // toward sector 6
          y = sectors[5].y + size - 1;
          x = sectors[5].x + (pos.x - sectors[4].x);
          [dy, dx] = [dy, dx];
        }
        break;
      // sector 6
      case 5:
        if (dy == 0 && dx == 1) { // toward sector 3
          y = sectors[2].y + size - 1;
          x = sectors[2].x + (pos.y - sectors[5].y);
          [dy, dx] = [-dx + 0, dy];
        }
        else if (dy == 0 && dx == -1) { // toward sector 4
          y = sectors[3].y;
          x = sectors[3].x + (pos.y - sectors[5].y);
          [dy, dx] = [-dx + 0, dy];
        }
        else if (dy == 1 && dx == 0) { // toward sector 5
          y = sectors[4].y;
          x = sectors[4].x + (pos.x - sectors[5].x);
          [dy, dx] = [dy, dx];
        }
        break;
      }

      return {y, x, direction: {dy, dx}};
  }

  this.nextCubeStep = (pos, direction, sectors) => {
    let {dy, dx} = direction;
    let {y, x} = pos;

    let maxY = Math.max(...sectors.map(start => start.y));
    let maxX = Math.max(...sectors.map(start => start.x));

    let prevSector = this.getSector(sectors, pos);
    let nextSector = this.getSector(sectors, {y: pos.y + dy, x: pos.x + dx});

    if (nextSector.length == 0) {
      if (maxY > maxX) {
        return this.moveToSector2(sectors, prevSector[0], pos, direction);
      }
      else {
        return this.moveToSector(sectors, prevSector[0], pos, direction);
      }
    }
    else {
      return { y: y + dy, x: x + dx, direction };
    }
  }

  this.nextStep = (map, pos, direction) => {
    const {dy, dx} = direction;

    let y = (pos.y + dy + map.length) % map.length;
    let x = (pos.x + dx + map[0].length) % map[0].length;

    return {y, x, direction};
  }

  this.moveStep = (map, pos, direction, sectors) => {
    let newPos = {...pos};

    while(true) {
      if (sectors) {
        newPos = this.nextCubeStep(newPos, direction, sectors);
      }
      else {
        newPos = this.nextStep(map, newPos, direction);
      }
      let {y, x} = newPos;

      if (map[y][x] === this.Tiles.Empty) {
        direction.dy = newPos.direction.dy;
        direction.dx = newPos.direction.dx;
        return { y, x }
      }      
      if (map[y][x] === this.Tiles.Wall) {
        return pos
      }
    }
  }

  this.moveInstruction = (map, pos, instruction, direction, sectors) => {
    let {dy, dx } = direction;

    for(let j = 0; j < instruction.steps; j ++) {
      pos = this.moveStep(map, pos, direction, sectors);
    }

    if (instruction.dir == this.Moves.R) {
     [dy, dx] = [direction.dx + 0, -direction.dy + 0];
    }
    else if (instruction.dir == this.Moves.L) {
     [dy, dx] = [-direction.dx + 0, direction.dy + 0];
    }

    return [pos, {dy, dx}];
  }


  this.move = (map, route, sectors) => {
    let pos = this.getStartPos(map);
    let direction = { dy: 0, dx: 1};

    for(let i = 0; i < route.length; i ++) {
      [pos, direction] = this.moveInstruction(map, pos, route[i], direction, sectors);
    }

    let k = 0;
    if (direction.dy == 0) {
      k = (direction.dx == 1) ? 0 : 2
    }
    else {
      k = (direction.dy == 1) ? 1 : 3
    }

    return (1000 * (pos.y + 1) + 4 * (pos.x + 1) + k);
  }

  this.getStartPos = (map) => {
    let x = 0;
    while(map[0][x] == this.Tiles.Skip && x < map[0].length) {
      x ++
    }
    return { y: 0, x: x};
  }
}

export { parseInputData, MonkeyMap };