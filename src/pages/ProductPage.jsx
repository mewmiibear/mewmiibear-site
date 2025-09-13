import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '../components/UI/use-toast';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id),
    name: 'Kawaii Bear Notebook',
    price: 24.99,
    originalPrice: 29.99,
    images: [
      'Cute pink notebook with kawaii bear design and pastel colors - main view',
      'Kawaii bear notebook opened showing lined pages with cute headers',
      'Close-up of kawaii bear notebook cover with embossed details',
      'Kawaii bear notebook size comparison with hand'
    ],
    category: 'stationery',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 15,
    description: 'This adorable kawaii bear notebook is perfect for all your note-taking needs! Featuring a super cute bear design in soft pastel colors, this notebook will bring joy to your daily writing. The high-quality paper is perfect for pens, pencils, and even light markers.',
    features: [
      '📝 120 lined pages',
      '🌸 A5 size (5.8" x 8.3")',
      '💕 Soft-touch cover',
      '🎀 Ribbon bookmark',
      '⭐ Acid-free paper',
      '🧸 Kawaii bear design'
    ],
    specifications: {
      'Dimensions': '5.8" x 8.3" x 0.6"',
      'Pages': '120 lined pages',
      'Paper Weight': '80gsm',
      'Cover Material': 'Soft-touch laminated cardstock',
      'Binding': 'Perfect bound',
      'Made in': 'Japan'
    }
  };

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
          <Link to={`/shop/${product.category}`} className="hover:text-pink-500 capitalize">
            {product.category}
          </Link>
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
               src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`kawaii-card overflow-hidden kawaii-hover ${
                    selectedImage === index ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  <img 
                    className="w-full h-20 object-cover"
                    alt={`${product.name} view ${index + 1}`}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </button>
              ))}
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
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-pink-500">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Features:</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
              </span>
            </div>

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
                    disabled={quantity >= product.stockCount}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
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

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kawaii-card p-8 mb-16"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kawaii-card p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
            <button
              onClick={() => toast({
                title: "Write Review ✍️",
                description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
              className="kawaii-button"
            >
              Write Review
            </button>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-800">{review.name}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kawaii-card overflow-hidden kawaii-hover"
              >
                <img 
                  className="w-full h-48 object-cover"
                  alt={relatedProduct.name}
                 src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{relatedProduct.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(relatedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-pink-500">${relatedProduct.price}</span>
                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="kawaii-button text-sm px-4 py-2"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductPage;