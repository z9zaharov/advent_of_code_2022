/**
 * --- Day 6: Tuning Trouble ---
 */

function parseInputData(data, separator) {
  return data;
}

const CommDevice = function () {
  this.MARKER_LENGTH = 4;
  this.MESSAGE_LENGTH = 14;

  this.resetToUnique = (data, idx) => {
    return data.substring(idx + 1);
  }

  this.findMarkerPos = (data, length) => {
    let uniqueData = '';
    let i = 0;

    while(i < data.length) {
      const idx = uniqueData.indexOf(data[i]);

      if ((uniqueData.length == length - 1) && idx == -1) {
        return i + 1;
      }
      else if (idx > -1) {
        uniqueData = this.resetToUnique(uniqueData, idx);
      }
      uniqueData += data[i];
      i ++;
    }

    return -1;
  }
}

export { parseInputData, CommDevice };