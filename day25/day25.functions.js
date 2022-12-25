/**
 * --- Day 25: Full of Hot Air ---
 */

function parseInputData(data) {
  return data;
}

const Snafu = function () {

  this.Digits = {
    '=': -2,
    '-': -1,
    '0': 0,
    '1': 1,
    '2': 2
  }

  this.SnafuDigits = {
    '-2': '=',
    '-1': '-',
    '0': 0,
    '1': 1,
    '2': 2
  }

  this.toDecimal = (snafu) => {
    let mult = 5;
    let res = 0;
    for(let i = 0; i < snafu.length; i ++) {
      res = res * mult + this.Digits[snafu[i]];
    }

    return res;
  }

  this.toSnafu = (decimal) => {
    let mult = 5;
    let res = '';
    let decDigits = Object.values(this.Digits);

    while(decimal > 0) {
      let digit = decimal % mult;
      decimal = (decimal - digit) / mult;

      if (digit <= Math.max(...decDigits)) {
        res = this.SnafuDigits[digit.toString()] + res;
      }
      else {
        decimal = decimal + 1;
        digit = digit - mult;
        res = this.SnafuDigits[digit.toString()].toString() + res;
      }
    }

    return res;
  }

  this.getSum = (data) => {
    return data.reduce((sum, snafu) => {
      return sum + this.toDecimal(snafu);
    }, 0);
  }

}

export { parseInputData, Snafu };
