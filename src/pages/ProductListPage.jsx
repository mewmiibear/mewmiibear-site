import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) setError(error.message);
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-pink-50 text-pink-500 text-xl">Loading products...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen bg-pink-50 text-red-500 text-xl">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-pink-500 mb-8 text-center">Shop Cute Products 🧸</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg border border-pink-200 p-6 flex flex-col items-center kawaii-card">
              <img src={product.image_url || 'https://images.unsplash.com/photo-1635865165118-917ed9e20936'} alt={product.name} className="w-40 h-40 object-cover rounded-2xl mb-4 kawaii-shadow" />
              <h2 className="text-xl font-bold text-pink-600 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between w-full mt-2">
                <span className="text-2xl font-bold text-pink-500">${product.price}</span>
                <button className="bg-pink-100 p-2 rounded-full kawaii-bounce hover:bg-pink-200 transition-colors"><Heart className="text-pink-500" size={20} /></button>
              </div>
              <Link to={`/product/${product.id}`} className="mt-4 kawaii-button px-6 py-2 text-lg">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
