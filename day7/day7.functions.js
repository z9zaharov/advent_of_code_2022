/**
 * --- Day 7: No Space Left On Device ---
 */

function parseInputData(data, separator) {
  return data.map(line => line.trim().split(' '));
}

const FileSystem = function () {
  this.PromptSign = '$';

  this.FullSpace = 70000000;
  this.RequiredFreeSpace = 30000000;

  this.Types = {
    d: 'd',
    f: 'f'
  }

  this.CmdTypes = {
    cd: 'cd',
    ls: 'ls'
  }

  this.SpaceOver = () => this.RequiredFreeSpace - (this.FullSpace - this.FileTree.size);

  this.FileTree = { name: '/', size: -1, type: this.Types.d, children: [], parent: '' };

  this.addToDir = (parent, cmd) => {
    if (cmd[0] == 'dir') {
      parent.children.push({name: cmd[1], size: -1, type: this.Types.d, children: [], parent: parent});
    }
    else {
      parent.children.push({name: cmd[1], size: parseInt(cmd[0]), type: this.Types.f, children: [], parent: parent});
    }
  }

  this.isCmd = (cmd) => cmd[0] == this.PromptSign;

  this.navigateToDir = (current, cmd) => {
    const dir = cmd[2];
    if (dir == '/') {
      return this.FileTree;
    }
    else if (dir == '..') {
      return current.parent;
    }
    else {
      return current.children.filter(list => list.name == dir)[0];
    }
   }

  this.readPrompt = (current, cmd) => {
    if(this.isCmd(cmd)) {
      if (cmd[1] == this.CmdTypes.cd) {
        return this.navigateToDir(current, cmd);
      }
      return current;
    }
    else {
      this.addToDir(current, cmd);
      return current;
    }
  }

  this.navigateTree = (data) => {
    let current = this.FileTree;
    data.forEach(cmd => {
      current = this.readPrompt(current, cmd);
    });
  }

  this.calcDirSizes = (current) => {
      if (current.type == this.Types.d) {
        let sum = 0;
        current.children.forEach(el => {
          if (el.type == this.Types.f) {
            sum += el.size;
          }
          else {
            sum += this.calcDirSizes(el);
          }
        });
        current.size = sum;
      }
      return current.size;
  }

  this.getDirectoriesBySize = (current, dirs, size = 100000) => {
    if (current.type == this.Types.d) {
      if (current.size <= size) {
        dirs.push(current);
      }
      current.children.forEach(el => {
        if (el.type == this.Types.d) {
          this.getDirectoriesBySize(el, dirs);
        }
      });
    }
  }

  this.calcSumOfDirs = (data, size = 100000) => {
    this.navigateTree(data);
    this.calcDirSizes(this.FileTree);
    let dirs = [];
    this.getDirectoriesBySize(this.FileTree, dirs, size);

    return dirs.reduce((sum, dir) => {
      return sum + dir.size;
    }, 0);
  }

  this.findAllDirsToDelete = (current, dirs, sizeNeeded) => {
    if (current.type == this.Types.d) {
      if (current.size >= sizeNeeded) {
        dirs.push(current);
      }
      current.children.forEach(el => {
        if (el.type == this.Types.d) {
          this.findAllDirsToDelete(el, dirs, sizeNeeded);
        }
      });
    }
  }

  this.findDirToDelete = (data) => {
    this.navigateTree(data);
    this.calcDirSizes(this.FileTree);
    let dirs = [];
    this.findAllDirsToDelete(this.FileTree, dirs, this.SpaceOver());

    return dirs.reduce((min, dir) => {
      return Math.min(min, dir.size);
    }, Number.MAX_VALUE);
  }
}


export { parseInputData, FileSystem };