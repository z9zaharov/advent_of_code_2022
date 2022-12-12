/**
 * --- Day 12: Hill Climbing Algorithm ---
 */

function parseInputData(data) {
  return data.map(line => line.split(''));
}

const Hill = function () {

  this.Points = {
    S: 'S',
    E: 'E'
  }

  this.isInBoundary = function(point, field) {
    return (point.y >= 0 && point.y < field.length) && (point.x >= 0 && point.x < field[point.y].length);
  }

  this.getNeighbours = function(field, point) {
    let neighbours = [];
    if (this.isInBoundary({ y: point.y - 1, x: point.x}, field)) {
      neighbours.push({ y: point.y - 1, x: point.x});
    }
    if (this.isInBoundary({ y: point.y + 1, x: point.x}, field)) {
      neighbours.push({ y: point.y + 1, x: point.x});
    }
    if (this.isInBoundary({ y: point.y, x: point.x - 1}, field)) {
      neighbours.push({ y: point.y, x: point.x - 1});
    }
    if (this.isInBoundary({ y: point.y, x: point.x + 1}, field)) {
      neighbours.push({ y: point.y, x: point.x + 1});
    }
    return neighbours;
  }

  this.generateKey = function(y, x, length) {
    return y * length + x;
  }
  
  this.getHeightDiff = (point1, point2) => {
    if (point1 == this.Points.E) {
      return Math.abs(point2.charCodeAt(0) - ('z'.charCodeAt(0) + 1))
    }
    else if (point2 == this.Points.E) {
      return Math.abs(point1.charCodeAt(0) - ('z'.charCodeAt(0) + 1))
    }
    else if (point1 == this.Points.S) {
      return Math.abs(point2.charCodeAt(0) - ('a'.charCodeAt(0) - 1));
    }
    else if (point2 == this.Points.S) {
      return Math.abs(point1.charCodeAt(0) - ('a'.charCodeAt(0) - 1));
    }

    return Math.abs(point2.charCodeAt(0) - point1.charCodeAt(0));
  }

  this.getNodeRoutesAndCosts = (field, point) => {
    let cellRoutes = [];
    let cellCosts = [];

    let neighbours = this.getNeighbours(field, point);

    neighbours.forEach(neighbour => {
      const diff = this.getHeightDiff(field[neighbour.y][neighbour.x], field[point.y][point.x]);
      if (diff <= 1) {
        cellRoutes.push(this.generateKey(neighbour.y, neighbour.x, field[point.y].length));
        cellCosts.push(1);
      }
    });
    
    return [cellRoutes, cellCosts];
  }

  this.createRoutes = function(field) {
    let routes = [];
    let routesCosts = [];

    for(let i = 0; i < field.length; i ++) {
      for(let j = 0; j < field[i].length; j ++) {

        // generate available routes from the node and costs to them
        // this is the place to substitute for another condition
        let [cellRoutes, cellCosts] = this.getNodeRoutesAndCosts(field, { y: i, x: j});

        routes.push(cellRoutes);
        routesCosts.push(cellCosts);
      }
    }

    return { routes: routes, costs: routesCosts };
  }

  this.lowestCostNode = (costs, processed) => {
    let lowest = Infinity;
    let idx = -1;
    for (let i = 0; i < costs.length; i ++) {
      if (!processed[i] && (idx === -1 || costs[i] < lowest)) {
        lowest = costs[i];
        idx = i;
      }
    }
    return { val: lowest, idx: idx };
  };
  
  this.findPoint = (field, letter) => {
    for(let i = 0; i < field.length; i ++) {
      for(let j = 0; j < field[i].length; j ++) {
        if (field[i][j] == letter) {
          return { y: i, x: j}
        }
      }
    }
    return { y: 0, x: 0 };
  }

  // function that returns the minimum cost and path to reach Finish
  this.dijkstra = function(field, from, to) {
  
    let graph = this.createRoutes(field);

    const startRouteIdx = from.y * field[0].length + from.x;
    const endRouteIdx = to.y * field[0].length + to.x;

    // track lowest cost to reach each node
    const costs = new Array(field.length * field[0].length).fill(Infinity);

    // fill costs from starting point
    graph.routes[startRouteIdx].forEach((dest, i) => {
      costs[dest] = graph.costs[startRouteIdx][i];
    });

    // track nodes that have already been processed
    const processed = new Array(field.length * field[0].length).fill(false);
  
    let node = this.lowestCostNode(costs, processed);
    while (node.idx > -1) {
      let children = { routes: graph.routes[node.idx], costs: graph.costs[node.idx] };
      for(let i = 0; i < children.routes.length; i ++) {
        let newCost = node.val + children.costs[i]
        ;
        if (costs[children.routes[i]] > newCost) {
          costs[children.routes[i]] = newCost;
        }
      }
      processed[node.idx] = true;
      node = this.lowestCostNode(costs, processed);
    }

    return costs[endRouteIdx];
  };
  
  this.getStartingPoints = (field) => {
    let points = [];
    for(let i = 0; i < field.length; i ++) {
      for(let j = 0; j < field[i].length; j ++) {
        if (field[i][j] == 'a') {
          points.push({y: i, x: j});
        }
      }
    }
    return points;
  }

  this.countSteps = (field) => {
    const start = this.findPoint(field, this.Points.S);
    const end = this.findPoint(field, this.Points.E);

    return this.dijkstra(field, start, end);
  }

  this.findBestRoute = (field) => {
    const start = this.findPoint(field, this.Points.S);
    const end = this.findPoint(field, this.Points.E);

    field[start.y][start.x] = 'a';
    let points = this.getStartingPoints(field);

    return Math.min(...points.map(point => this.dijkstra(field, point, end)).filter(steps => Number.isFinite(steps)));
  }
}

export { parseInputData, Hill };
