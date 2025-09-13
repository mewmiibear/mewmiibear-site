import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) setMessage(error.message);
    else setProducts(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const { error } = await supabase.from("products").insert({ name, price: parseFloat(price), description: desc });
    if (error) setMessage(error.message);
    else {
      setMessage("Product added!");
      setName(""); setPrice(""); setDesc("");
      fetchProducts();
    }
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
