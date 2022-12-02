/**
 * --- Day 2: Rock Paper Scissors ---
 */

 function parseInputData(data) {
  return data.map(line => line.split(' '));
}

const RockPaperScissors = function () {

  this.Outcome = {
    'A': 1, // Rock
    'B': 2, // Paper
    'C': 3, // Scissors
    'X': 1, // Rock
    'Y': 2, // Paper
    'Z': 3  // Scissors
  }

  this.RoundResults = [
    [0, 1, -1], 
    [-1, 0, 1], 
    [1, -1, 0]
  ];

  this.YouOutCome = [
    ['C', 'A', 'B'],
    ['A', 'B', 'C'],
    ['B', 'C', 'A']
  ]

  this.WinPoints = {
    [-1]: 0,
    [0]: 3,
    [1]: 6,
  };

  this.playRound = (hisOutcome, yourOutcome) => {
    return this.Outcome[yourOutcome] + this.WinPoints[this.RoundResults[this.Outcome[hisOutcome] - 1][this.Outcome[yourOutcome] - 1]]; 
  }

  this.playRoundOnStrategy = (hisOutcome, yourOutcome) => {
    const yourStrategyOutcome = this.getYourOutcome(hisOutcome, yourOutcome)
    return this.playRound(hisOutcome, yourStrategyOutcome)
  }

  this.getYourOutcome = (hisOutcome, yourOutcome) => {
    return this.YouOutCome[this.Outcome[hisOutcome] - 1][this.Outcome[yourOutcome] - 1];
  }

  this.playGame = (data) => {
    return data.reduce((sum, outcomes) => {
      return sum + this.playRound(outcomes[0], outcomes[1]);
    }, 0);
  }

  this.playGameOnStrategy = (data) => {
    return data.reduce((sum, outcomes) => {
      return sum + this.playRoundOnStrategy(outcomes[0], outcomes[1]);
    }, 0);
  }
}

export { parseInputData, RockPaperScissors };