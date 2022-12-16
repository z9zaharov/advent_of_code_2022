/**
 * --- Day 15: Beacon Exclusion Zone ---
 */

function parseInputData(data) {
  return data.map(line => {
    let sensorStr = line.split(':')[0].substr('Sensor at'.length).trim();
    let beaconStr = line.split(':')[1].trim().substr('closest beacon is at'.length).trim();

    return {
      sensor: {
        x: parseInt(sensorStr.split(',')[0].trim().substr('x='.length)),
        y: parseInt(sensorStr.split(',')[1].trim().substr('y='.length))
      },
      beacon: {
        x: parseInt(beaconStr.split(',')[0].trim().substr('x='.length)),
        y: parseInt(beaconStr.split(',')[1].trim().substr('y='.length))
      }
    }

  });
}

const Beacon = function () {

  this.getBeamLength = (sensor) => {
    return Math.abs(sensor.sensor.y - sensor.beacon.y) + Math.abs(sensor.sensor.x - sensor.beacon.x);
  }

  this.getReachable = (sensor, y) => {
    let length = this.getBeamLength(sensor);
    let distance = Math.abs(sensor.sensor.y - y);
    if (distance <= length) {
      return { from: sensor.sensor.x - (length - distance), to: sensor.sensor.x + (length - distance)};
    }
  }

  this.merge = (distances) => {
    let coverage = [];

    distances.forEach(distance => {
      if (distance) {
        // not intersect with any
        if (!coverage.some(c => c.from >= distance.from || c.to <= distance.to)) {
          coverage.push(distance);
        }
        // if there is some distance in coverage which fully cover
        else if (coverage.some(c => c.from <= distance.from && c.to >= distance.to)) {

        }
        // exclude all covered by distance
        else {
          // exclude all covered by distance
          let covered = (coverage.map((c, i) => ({ distance: c, idx: i})).filter(c => c.distance.from >= distance.from && c.distance.to <= distance.to));
          if (covered.length > 0) {
            for(let i = covered.length - 1; i >= 0; i --) {
              coverage.splice(covered[i].idx, 1);
            }
          }

          // partially covered to the right
          let arrTo = coverage.filter(c => c.from <= distance.from && c.to >= distance.from && c.to <= distance.to).map(c => c.to);
          if (arrTo.length > 0) {
            let fromMax = Math.max(...arrTo);
            distance = {from: fromMax + 1, to: distance.to};
          }

          // partially covered to the left
          let arrFrom = coverage.filter(c => c.from >= distance.from && c.to >= distance.to && c.from <= distance.to).map(c => c.from);
          if (arrFrom.length > 0) {
            let toMax = Math.min(...arrFrom);
            distance = {from: distance.from, to: toMax - 1};
          }

          if (distance.from <= distance.to) {
            coverage.push(distance);
          }
        }
      }
    });
    return coverage;
  }

  this.getBeaconsX = (data, y) => {
    return data.filter(sensor => sensor.beacon.y == y).map(sensor => sensor.beacon.x).filter((v, i, a) => a.indexOf(v) === i);
  }

  this.isBeacon = (beaconX, from, to) => {
    return beaconX.some(x => from <= x && to >= x);
  }

  this.limitCoverage = (coverage, fromX, toX) => {
    for(let i = coverage.length - 1; i >= 0; i --) {
      if (coverage[i].to < fromX) {
        coverage.splice(i, 1);
      }
      else if (coverage[i].from < fromX && coverage[i].to >= fromX) {
        coverage[i].from = fromX;
      }
      else if (coverage[i].from > toX) {
        coverage.splice(i, 1);
      }
      else if (coverage[i].from <= toX && coverage[i].to >= toX) {
        coverage[i].to = toX;
      }
    }
  }

  this.getRowCoverage = (data, row, cutFunc = false) => {
    let reachable = data.map(sensor => this.getReachable(sensor, row)).filter(d => d != undefined);
    let coverage = this.merge(reachable);

    if (cutFunc) {
      cutFunc(coverage);
    }
    return coverage;
  }

  this.countMerged = (coverage, beacons, isExcludeBeacons = false) => {
    let length = coverage.reduce((sum, c) => {
      return sum + (c.to - c.from) + 1 + (!isExcludeBeacons && this.isBeacon(beacons, c.from, c.to) ? -1 : 0);
    }, 0);

    return length;
  }

  this.countRowCoverage = (data, row, isExcludeBeacons = false, cutFunc = false) => {
    const coverage = this.getRowCoverage(data, row, cutFunc);
    let beacons = this.getBeaconsX(data, row);

    return [this.countMerged(coverage, beacons, isExcludeBeacons), coverage, beacons];
  }

  this.findNotCoveredPos = (coverage) => {
    let sorted = coverage.sort((a, b) => (b.to < a.from) ? 1 : (a.to < b.from) ? -1 : 0);
    for(let i = 0; i < sorted.length - 1; i ++) {
      if (sorted[i + 1].from - sorted[i].to > 1) {
        return sorted[i].to + 1;
      }
    }
    return 0;
  }

  this.findHiddenBeaconPos = (data, fromX, fromY, toX, toY) => {
    for (let row = fromY; row <= toY; row ++) {
      let rowCoverage = this.countRowCoverage(data, row, true, (coverage) => { this.limitCoverage(coverage, fromX, toX)});
      if (rowCoverage[0] < toX - fromX + 1) {
        return { y: row, x: this.findNotCoveredPos(rowCoverage[1])}
      }
    }
  }

  this.getTuningFrequency = (data, fromX, fromY, toX, toY) => {
    let pos = this.findHiddenBeaconPos(data, fromX, fromY, toX, toY);
    if (pos) {
      return pos.x * 4000000 + pos.y;
    }
  }
}

export { parseInputData, Beacon };
