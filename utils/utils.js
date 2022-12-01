import fs from 'fs';
import { dirname, join } from 'path';

var getData = function() {
    const path = join(dirname(process.argv[1]), 'input.txt');
    return fs.readFileSync(path, {encoding:'utf8', flag:'r'});
}
  
var split_blocks = function(data, separator) {
    return data.split(separator);
}

var getBlocks = function(separator) {
    return split_blocks(getData(), separator);
}

export { getData, split_blocks, getBlocks };