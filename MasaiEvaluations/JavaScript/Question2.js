function aggregateData(transactions) {
  const grouped = {};

  for (let t of transactions) {
    const { category, amount } = t;

    if (!grouped[category]) {
      grouped[category] = {
        total: 0,
        count: 0,
        highest: amount,
        lowest: amount,
      };
    }

    grouped[category].total += amount;
    grouped[category].count += 1;
    grouped[category].highest = Math.max(grouped[category].highest, amount);
    grouped[category].lowest = Math.min(grouped[category].lowest, amount);
  }

  for (let category in grouped) {
    const obj = grouped[category];
    obj.average = Number((obj.total / obj.count).toFixed(2));
    obj.total = Number(obj.total.toFixed(2));
  }

  console.log(grouped);
}


const transactions = [
  { id: 1, category: 'Food', amount: 45.5 },
  { id: 2, category: 'Transport', amount: 20 },
  { id: 3, category: 'Food', amount: 30.75 },
  { id: 4, category: 'Entertainment', amount: 50 },
  { id: 5, category: 'Food', amount: 25.25 },
  { id: 6, category: 'Transport', amount: 15.5 }
];

aggregateData(transactions);
