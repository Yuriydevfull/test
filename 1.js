const sum_to_n_a = function (n) {
  const sum = Array.from({ length: n }, (_, i) => i + 1).reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  return sum;
};

const sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

const sum_to_n_c = function (n) {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5), sum_to_n_b(5), sum_to_n_c(5));
