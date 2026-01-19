import { useState } from "react";

export default function App() {
  const [qty, setQty] = useState(0);
  const price = 29.99;

  const subtotal = qty * price;
  const discount = qty >= 5 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div>
      <h2>Product</h2>

      <button onClick={() => setQty(qty - 1)} disabled={qty === 0}>-</button>
      <span>{qty}</span>
      <button onClick={() => setQty(qty + 1)}>+</button>

      <p>Unit Price: ${price.toFixed(2)}</p>

      {qty >= 5 && <p>Bulk discount applied (10%)</p>}

      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
