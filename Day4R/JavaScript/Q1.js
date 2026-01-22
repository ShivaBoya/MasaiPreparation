Array.prototype.myReduce = function (callback, initialValue) {
  let acc;
  let startIndex;

  if (initialValue !== undefined) {
    acc = initialValue;
    startIndex = 0;
  } else {
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};
