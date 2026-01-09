function aggregateTransactions(transactions) {
  return transactions.reduce((acc, { date, category, items }) => {
    if (!acc[category]) {
      acc[category] = {
        total: 0,
        count: 0,
        dates: {}
      };
    }

    if (!acc[category].dates[date]) {
      acc[category].dates[date] = 0;
    }

    items.forEach(({ amount }) => {
      acc[category].total += amount;
      acc[category].count += 1;
      acc[category].dates[date] += amount;
    });

    return acc;
  }, {});
}

const result = aggregateTransactions(transactions);
console.log(result);
