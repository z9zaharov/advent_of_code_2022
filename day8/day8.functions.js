/**
 * --- Day 8: Treetop Tree House ---
 */

function parseInputData(data) {
  return data.map(line => line.trim().split('').map(h => { 
    return {
      height: parseInt(h),
      around: { top: -1, right: -1, down: -1, left: -1 },
      scenic: { top: 0, right: 0, down: 0, left: 0 }
    }
  }));
}

const TreeHouse = function () {

  this.getAroundTopLeft = (data, i, j) => {
    data[i][j].around.top = Math.max(data[i - 1][j].height, data[i - 1][j].around.top);
    data[i][j].around.left = Math.max(data[i][j - 1].height, data[i][j - 1].around.left);
  }

  this.getAroundRightDown = (data, i, j) => {
    data[i][j].around.down = Math.max(data[i + 1][j].height, data[i + 1][j].around.down);
    data[i][j].around.right = Math.max(data[i][j + 1].height, data[i][j + 1].around.right);
  }


  this.getScenic = (data, i, j) => {
    let idx = i - 1;
    while(idx >= 0 && data[idx][j].height < data[i][j].height) {
      idx --;
    }
    data[i][j].scenic.top = i - Math.max(idx, 0);

    idx = i + 1;
    while(idx < data.length && data[idx][j].height < data[i][j].height) {
      idx ++;
    }
    data[i][j].scenic.down = Math.min(idx, data.length - 1) - i;

    idx = j - 1;
    while(idx >= 0 && data[i][idx].height < data[i][j].height) {
      idx --;
    }
    data[i][j].scenic.left = j - Math.max(idx, 0);

    idx = j + 1;
    while(idx < data[0].length && data[i][idx].height < data[i][j].height) {
      idx ++;
    }
    data[i][j].scenic.right = Math.min(idx, data[0].length - 1) - j;
  }

  this.findMaxHeightsAround = (data) => {
    for(let i = 1; i < data.length; i ++) {
      for(let j = 1; j < data[0].length; j ++) {
        this.getAroundTopLeft(data, i, j);
        this.getAroundRightDown(data, data.length - 1 - i, data[0].length - 1 - j);
      }
    }
    // for(let i = data.length - 2; i >= 0; i --) {
    //   for(let j = data[0].length - 2; j >= 0; j --) {
    //     this.getAroundRightDown(data, i, j);
    //   }
    // }
  }

  this.findMaxHeightsScenic = (data) => {
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[0].length; j ++) {
        this.getScenic(data, i, j);
      }
    }
  }

  this.isVisible = (tree) => {
    return tree.around.top < tree.height 
          || tree.around.right < tree.height 
          || tree.around.down < tree.height 
          || tree.around.left < tree.height;
  }
  
  this.countVisible = (data) => {
    let count = 0;
    this.findMaxHeightsAround(data);
    data.forEach(treeCol => {
      treeCol.forEach(tree => {
        if (this.isVisible(tree)) {
          count ++;
        }
      })
    });
    return count;
  }

  this.calcScenicScore = (tree) => {
    return tree.scenic.top * tree.scenic.right * tree.scenic.down * tree.scenic.left;
  }

  this.getMaxScenicScore = (data) => {
    let max = 0;
    this.findMaxHeightsScenic(data);
    data.forEach(treeCol => {
      treeCol.forEach(tree => {
        max = Math.max(max, this.calcScenicScore(tree));
      })
    });
    return max;
  }
}

export { parseInputData, TreeHouse };
