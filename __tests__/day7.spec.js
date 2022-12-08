import { expect } from "@jest/globals";
import { parseInputData, FileSystem } from "../day7/day7.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 7: No Space Left On Device ---", () => {

  function get_input() {
    let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
   
    return input;
  }  

  var data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/));
  })

  it('navigate file tree', () => {
    var fs = new FileSystem();
    fs.navigateTree(data);

    expect(fs.FileTree.children[0].name).toBe('a');
    expect(fs.FileTree.children.length).toBe(4);
  }); 

  it('calc file tree', () => {
    var fs = new FileSystem();
    fs.navigateTree(data);
    fs.calcDirSizes(fs.FileTree);

    expect(fs.FileTree.children[0].size).toBe(94853);
    expect(fs.FileTree.children[3].size).toBe(24933642);
    expect(fs.FileTree.size).toBe(48381165);
  }); 

  it('get directories by size', () => {
    var fs = new FileSystem();
    fs.navigateTree(data);
    fs.calcDirSizes(fs.FileTree);
    let dirs = [];
    fs.getDirectoriesBySize(fs.FileTree, dirs);

    expect(dirs.length).toBe(2);
  }); 

  it('calc sum of directories', () => {
    var fs = new FileSystem();
    let res = fs.calcSumOfDirs(data);

    expect(res).toBe(95437);
  }); 

  it('get directories matched for deleting', () => {
    var fs = new FileSystem();
    fs.navigateTree(data);
    fs.calcDirSizes(fs.FileTree);
    let dirs = [];
    fs.findAllDirsToDelete(fs.FileTree, dirs, fs.SpaceOver());

    expect(dirs.length).toBe(2);
    expect(dirs[0].name).toBe('/');
    expect(dirs[1].name).toBe('d');
  }); 

  it('find dir size to delete', () => {
    var fs = new FileSystem();
    let res = fs.findDirToDelete(data);

    expect(res).toBe(24933642);
  }); 
})