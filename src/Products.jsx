import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // TODO: Replace with your new product fetching logic
    setProducts([]);
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    // TODO: Replace with your new product adding logic
    setMessage("Product logic removed. Please implement your new product system.");
    setName(""); setPrice(""); setDesc("");
  }

  return (
    <div>
      <h2>Products</h2>
      <form>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
        <button onClick={handleAdd}>Add Product</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price} - {p.description}</li>
        ))}
      </ul>
    </div>
  );
}
