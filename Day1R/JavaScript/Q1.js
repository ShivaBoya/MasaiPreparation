const products = [
  ['Electronics', 'Laptop', 999],
  ['Clothing', 'Shirt', 29],
  ['Electronics', 'Mouse', 25],
  ['Clothing', 'Pants', 49],
  ['Electronics', 'Keyboard', 75],
  ['Clothing', 'Jacket', 89]
];

const result = {};

for (let i = 0; i < products.length; i++) {
  const category = products[i][0];
  const name = products[i][1];
  const price = products[i][2];

  if (!result[category]) {
    result[category] = [];
  }

  result[category].push({ name, price });
}

for (let key in result) {
  result[key].sort((a, b) => a.price - b.price);
}

console.log(result);
