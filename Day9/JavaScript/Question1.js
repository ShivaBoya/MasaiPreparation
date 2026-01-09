function pivotSales(sales) {
  return sales.reduce((acc, { month, product, amount }) => {
    if (!acc[product]) acc[product] = { total: 0 };
    acc[product][month] = amount;
    acc[product].total += amount;
    return acc;
  }, {});
}

const result1 = pivotSales(sales);
console.log(result1);
