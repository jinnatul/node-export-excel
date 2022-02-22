export const isPrime = (number) => {
  let primeArr = new Array(number + 1).fill(true);
  primeArr[0] = false;
  primeArr[1] = false;
  for (let num = 2; num <= number; num += 1) {
    if (primeArr[num] === true) {
      let nextnum = num * num;
      while (nextnum <= number) {
        primeArr[nextnum] = false;
        nextnum += num;
      }
    }
  }
  return primeArr[number];
};