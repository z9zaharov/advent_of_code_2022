/**
 * --- Day 10: Cathode-Ray Tube ---
 */

function parseInputData(data) {
  return data.map(line => {
    const instruction = line.trim().split(' ');
    return {
      cmd: instruction[0],
      value: (instruction.length > 1) ? parseInt(instruction[1]) : 0
    }
  });
}

const CathodeRayTube = function () {

  this.Cmd = {
    Noop: 'noop',
    Addx: 'addx'
  }

  this.X = 1;
  this.Cycle = 1;

  this.Cycles = [20, 60, 100, 140, 180, 220];

  this.cmdCycles = (cmd) =>{
    switch(cmd) {
      case this.Cmd.Noop:
        return 1;
      case this.Cmd.Addx:
        return 2;
    };
  }

  this.runInstruction = (instruction, isCycle = true) => {
    switch(instruction.cmd) {
      case this.Cmd.Noop:
        // if (isCycle) {
        //   this.Cycle ++;
        // }
        break;
      case this.Cmd.Addx:
        // if (isCycle) {
        //   this.Cycle += 2;
        // }
        this.X += instruction.value;
        break;
    };
  }

  this.strengthUpdate = (state) => {
    if (state.cycleToCheck < state.Cycles.length && this.Cycle == state.Cycles[state.cycleToCheck] 
        ) {
//          console.log("" + this.Cycle + " " + (this.Cycle + this.cmdCycles(instruction.cmd)) + " " + this.Cycles[cycleToCheck] + " " + this.X + " " + instruction.cmd + " " + instruction.value + " " + (this.Cycles[cycleToCheck] * this.X));
        
        state.strength += (state.Cycles[state.cycleToCheck] * this.X);
        state.cycleToCheck ++;
    }
  }



  this.execProgram = (data, state, updateStateFunc) => {
    let pointer = 0;
    let instruction = data[pointer];
    
    while(pointer < data.length) {
      let cmdCycles = this.cmdCycles(instruction.cmd);
      while(cmdCycles > 0) {
        updateStateFunc(state);
        this.Cycle ++;
        cmdCycles --;
      }
      this.runInstruction(instruction);
      pointer ++;
      instruction = data[pointer];
    }
  }

  this.sumStrength = (data) => {
    let state = {
      cycleToCheck: 0,
      strength: 0,
      Cycles: [20, 60, 100, 140, 180, 220]
    }

    this.execProgram(data, state, this.strengthUpdate);
    return state.strength;
  }


  this.getPixel = (pos, offset) => {
    return (pos >= offset - 1 && pos <= offset + 1) ? '#' : '.';
  }

  this.displayCrt = (state) => {
    state.crt[state.line] += this.getPixel(state.pos ++, this.X);
    if (state.crt[state.line].length == state.width) {
      state.pos = 0;
      state.line ++;
    }
}

  this.display = (data) => {
    let state = {
      crt: new Array(6).fill(''),
      line: 0,
      pos: 0,
      width: 40
    }

    this.execProgram(data, state, this.displayCrt);
    return state.crt;
  }
}

export { parseInputData, CathodeRayTube };
