import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from '../components/UI/use-toast';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) setError(error.message);
      else setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const relatedProducts = [
    {
      id: 4,
      name: 'Unicorn Pen Set',
      price: 19.99,
      image: 'Colorful unicorn-themed gel pens with glitter',
      rating: 4.6
    },
    {
      id: 8,
      name: 'Sakura Sticky Notes',
      price: 8.99,
      image: 'Cherry blossom themed sticky notes in pink and white',
      rating: 4.4
    },
    {
      id: 6,
      name: 'Kawaii Desk Organizer',
      price: 39.99,
      image: 'Pink desk organizer with multiple compartments and cute design',
      rating: 4.8
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely love this notebook! The bear design is so cute and the paper quality is amazing. Perfect for journaling! 💕',
      verified: true
    },
    {
      id: 2,
      name: 'Emma K.',
      rating: 5,
      date: '2024-01-10',
      comment: 'Such high quality! The cover feels so nice and the pages are thick enough that ink doesn\'t bleed through. Highly recommend!',
      verified: true
    },
    {
      id: 3,
      name: 'Lily R.',
      rating: 4,
      date: '2024-01-08',
      comment: 'Really cute notebook, exactly as pictured. Only wish it came in more colors!',
      verified: false
    }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart! 🛍️",
      description: `${quantity} x ${product.name} added to your cart`
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-pink-50 text-pink-500 text-xl">Loading product...</div>;
  }
  if (error || !product) {
    return <div className="flex justify-center items-center min-h-screen bg-pink-50 text-red-500 text-xl">Product not found.</div>;
  }

  // You can further map product fields to your UI below
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <Helmet>
        <title>{product.name} - Mewmii Bear's Shop</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        >
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-pink-500">Shop</Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Back to Shop</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="kawaii-card overflow-hidden">
              <img 
                className="w-full h-96 object-cover"
                alt={product.name}
                src={product.image_url || 'https://images.unsplash.com/photo-1595872018818-97555653a011'} />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-pink-500">${product.price}</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-800">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={product.stock && quantity >= product.stock}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="kawaii-button flex-1 flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => toast({
                    title: "Wishlist ❤️",
                    description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  })}
                  className="w-14 h-14 bg-white border-2 border-pink-300 rounded-2xl flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <Heart size={20} className="text-pink-500" />
                </button>
                <button
                  onClick={() => toast({
                    title: "Share Product 📤",
                    description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  })}
                  className="w-14 h-14 bg-white border-2 border-pink-300 rounded-2xl flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <Share2 size={20} className="text-pink-500" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;