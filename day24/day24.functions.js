/**
 * --- Day 24: Blizzard Basin ---
 */

function parseInputData(data) {
//  let map = new Array(data.length).fill('').map((line, i) => new Array(data[i].length).fill(0));

  let blizzards = {
    '>': 0b0001, 
    'v': 0b0010, 
    '<': 0b1000, 
    '^': 0b0100
  }

  let map = data.reduce((rows, line) => {
    let row = line.split('').map(point => {
      return (point == '.') ? 0 : (point == '#') ? 0b10000 : blizzards[point];
    });
    rows.push(row);

    return rows;
  }, []);

  return {
    map: map,
    start: { y: 0, x: map[0].indexOf(0) },
    finish: { y: map.length - 1, x: map[map.length - 1].indexOf(0)}
  }
}

const BlizzardBasin = function () {

  this.Neighbours = {
    Right:  {dy: 0, dx: 1}, 
    Down:   {dy: 1, dx: 0}, 
    Left:   {dy: 0, dx: -1}, 
    Top:    {dy: -1, dx: 0}
  };

  this.Blizzards = {
    '>': 0b0001, 
    'v': 0b0010, 
    '<': 0b1000, 
    '^': 0b0100
  };

  this.NeighbourBlizzard = {
    Right: this.Blizzards['<'],
    Down: this.Blizzards['^'],
    Left: this.Blizzards['>'],
    Top: this.Blizzards['v']
  }

  this.PointTypes = {
    Empty: '.',
    Rock: '#'
  }

  this.getNext = (length, offset, val) => {
    let next = val + offset;
    return (next == 0) ? length - 2 : (next == length - 1) ? 1 : next;
  }

  this.getNextPointState = (map, y, x) => {
    if (y == 0 || y == map.length - 1 || x == 0 || x == map[0].length - 1) {
      return map[y][x];
    }
    if (y > 0 && y < map.length - 1 && x > 0 && x < map[0].length - 1) {
      let sum = 0;
      Object.keys(this.Neighbours).forEach((neighbour, i) => {

        let blizzard = this.NeighbourBlizzard[neighbour];

        let nextY = this.getNext(map.length, this.Neighbours[neighbour].dy, y);
        let nextX = this.getNext(map[0].length, this.Neighbours[neighbour].dx, x);

        sum = sum | (map[nextY][nextX] & blizzard);
      });
      return sum;
    }
  }

  this.getMoves = (map, pos) => {
    let moves = [];

    Object.keys(this.Neighbours).forEach(neighbour => {
      let y = (pos.y + this.Neighbours[neighbour].dy + map.length) % map.length;
      let x = (pos.x + this.Neighbours[neighbour].dx + map[0].length) % map[0].length;

      if (y == 0 && map[y][x] == 0) {
        moves.push({y, x});
      }

      if (y == map.length - 1 && map[y][x] == 0) {
          moves.push({y, x});
      }

      if (y > 0 && y < map.length - 1 && x > 0 && x < map[0].length - 1) {
        if(map[y][x] == 0) {
          moves.push({y, x});
        }
      }
    });

    if(map[pos.y][pos.x] == 0) {
      moves.push(pos);
    }

    return moves;
  }

  this.getMapState = (states, minutes) => {
    let idx = minutes % Object.keys(states).length;
    return states[idx];
  }

  this.generateState = (map) => {
    return map.reduce((rows, line, i) => {
      rows.push(line.map((point, j) => this.getNextPointState(map, i, j)));
      return rows;
    }, []);
  }

  this.generateAllStates = (data) => {
    let states = { 0: data.map };
    for(let i = 1; i < data.map.length * data.map[0].length - 1; i ++) {

      let map = states[Object.keys(states).length - 1];
      states[i] = this.generateState(map);
    }
    return states;
  }

  this.getMinRoute = (data) => {
    let states = this.generateAllStates(data);

    return this.bfs(states, data.start, data.finish, 0);
  }

  this.getThreeRuns = (data) => {
    let states = this.generateAllStates(data);

    let first = this.bfs(states, data.start, data.finish, 0);
    let second = this.bfs(states, data.finish, data.start, first);
    let third = this.bfs(states, data.start, data.finish, second);

    return third;
  }

  this.mapToString = (map) => {
    let newMap = new Array(map.length).fill('').map((line, i) => new Array(map[i].length).fill('').map((cell, j) => (map[i][j] & 0b10000) ? this.PointTypes.Rock : this.PointTypes.Empty));
    for (let i = 1; i < map.length - 1; i ++) {
      for(let j = 1; j < map[i].length - 1; j ++) {
        newMap[i][j] = this.PointTypes.Empty;
        Object.keys(this.Blizzards).forEach(blizzard => {
          if (map[i][j] & this.Blizzards[blizzard]) {
            newMap[i][j] += blizzard; 
          }
        })
      }
    }
    return newMap;
  }

  this.bfs = (states, start, finish, startingTime) => {
    let queue = [{ position: {...start}, minute: startingTime }];
    let cache = {[startingTime]: [{...start}]};

    while (queue.length > 0) {
        let current = queue.shift();

       let state = this.getMapState(states, current.minute + 1);
       let availMoves = this.getMoves(state, current.position);

        for (let move of availMoves) {
            if (move.x == finish.x && move.y == finish.y) return current.minute + 1;

            if (cache[current.minute + 1] && cache[current.minute + 1].some(point => point.y == move.y && point.x == move.x)) {
              continue;
            }
            if (!cache[current.minute + 1]) {
              cache[current.minute + 1] = [{...move}];
            }
            else {
              cache[current.minute + 1].push({...move});
            }
            queue.push({ position: {...move}, minute: current.minute + 1 });
        }
    }
  }
}

export { parseInputData, BlizzardBasin };
