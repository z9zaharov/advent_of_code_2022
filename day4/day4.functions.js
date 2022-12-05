/**
 * --- Day 4: Camp Cleanup ---
 */

 function parseInputData(data) {
  return data.map(line => line.split(',').map(range => {
    let parts = range.trim().split('-');
    return {
      start: parseInt(parts[0].trim()),
      end: parseInt(parts[1].trim())
    }
  }));
}

const Cleanup = function () {

  this.isOverlap = (range1, range2) => {
    return (range1.start <= range2.start && range1.end >= range2.end
            || range2.start <= range1.start && range2.end >= range1.end)
  }

  this.isOverlapAny = (range1, range2) => {
    return (range1.start <= range2.start && range1.end >= range2.start 
      || range1.start <= range2.end && range1.end >= range2.end 
      || range2.start <= range1.start && range2.end >= range1.start 
      || range2.start <= range1.end && range2.end >= range1.end 
      )
  }

  this.countOverlaps = (data, overlapFunc) => {
    return data.reduce((sum, assignment) => {
      return sum + (overlapFunc(assignment[0], assignment[1]) ? 1 : 0);
    }, 0)
  }

}

export { parseInputData, Cleanup };