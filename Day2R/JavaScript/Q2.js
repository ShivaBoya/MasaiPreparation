const orders = [
  {
    orderId: 'A1',
    customer: { name: 'John', location: { city: 'NYC', country: 'USA' } },
    items: [
      { product: 'Laptop', quantity: 1, price: 999 },
      { product: 'Mouse', quantity: 2, price: 25 }
    ]
  },
  {
    orderId: 'A2',
    customer: { name: 'Jane', location: { city: 'LA', country: 'USA' } },
    items: [
      { product: 'Keyboard', quantity: 1, price: 75 }
    ]
  }
];

const output = [];

for (let i = 0; i < orders.length; i++) {
  const order = orders[i];

  for (let j = 0; j < order.items.length; j++) {
    output.push({
      orderId: order.orderId,
      customerName: order.customer.name,
      city: order.customer.location.city,
      country: order.customer.location.country,
      product: order.items[j].product,
      quantity: order.items[j].quantity,
      price: order.items[j].price
    });
  }
}

console.log(output);
