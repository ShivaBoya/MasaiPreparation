function deepFlatten(arr) {
  const result = [];

  function helper(input) {
    for (let item of input) {
      if (Array.isArray(item)) {
        helper(item);
      } else {
        result.push(item);
      }
    }
  }

  helper(arr);
  return result;
}

const nested = [1, [2, [3, [4, 5]], 6], [7, 8], 9, [[10]]];

console.log(deepFlatten(nested));
