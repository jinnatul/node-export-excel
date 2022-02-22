"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPrime = exports.isPrime = function isPrime(number) {
  var primeArr = new Array(number + 1).fill(true);
  primeArr[0] = false;
  primeArr[1] = false;
  for (var num = 2; num <= number; num += 1) {
    if (primeArr[num] === true) {
      var nextnum = num * num;
      while (nextnum <= number) {
        primeArr[nextnum] = false;
        nextnum += num;
      }
    }
  }
  return primeArr[number];
};