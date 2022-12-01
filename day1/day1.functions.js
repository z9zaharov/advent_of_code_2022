/**
 * --- Day 1: Calorie Counting ---
 */

 function parseInputData(data, separator) {
  return data.map(block => block.split(separator).reduce((calories, line) => {
      return calories + parseInt(line.trim());
    }, 0)
  );
}

const Calories = function () {
  this.getMax = (elves_calories) => {
    return Math.max(...elves_calories);
  }

  this.threeMax = (elves_calories) => {
    let first, second, third = Number.MIN_VALUE;
    first = this.getMax(elves_calories);

    let firstMaxIdx = elves_calories.indexOf(first);
    elves_calories.splice(firstMaxIdx, 1);
    second = this.getMax(elves_calories);

    let secondMaxIdx = elves_calories.indexOf(second);
    elves_calories.splice(secondMaxIdx, 1);
    third = this.getMax(elves_calories);

    return first + second + third;
  }

  this.threeLargest = (elves_calories) => {
    if (elves_calories.length < 3) {
      return 0;
    }

    let first, second, third; 
    first = second = third = Number.MIN_VALUE;

    elves_calories.forEach(calories => {
        if (calories > first) {
            third = second;
            second = first;
            first = calories;
        }
        else if (calories > second) {
            third = second;
            second = calories;
        }
        else if (calories > third) {
            third = calories;
        }
    });

    return first + second + third;
  }
}

export { parseInputData, Calories };