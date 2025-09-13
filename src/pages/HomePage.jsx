import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Gift } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '../components/UI/use-toast';

const HomePage = () => {
  const { addToCart } = useCart();

  const featuredProducts = [
    {
      id: 1,
      name: 'Kawaii Bear Notebook',
      price: 24.99,
      image: 'Cute pink notebook with kawaii bear design and pastel colors',
      category: 'stationery',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Fluffy Cloud Plushie',
      price: 34.99,
      image: 'Soft white cloud plushie with rainbow details and kawaii face',
      category: 'plushies',
      badge: 'Bestseller'
    },
    {
      id: 3,
      name: 'Pastel Mug Set',
      price: 29.99,
      image: 'Set of pastel colored mugs with cute animal faces',
      category: 'lifestyle',
      badge: 'Limited'
    }
  ];

  const categories = [
    {
      name: 'Stationery',
      icon: '📝',
      description: 'Cute notebooks, pens & more',
      path: '/shop/stationery',
      color: 'from-pink-200 to-pink-300'
    },
    {
      name: 'Plushies',
      icon: '🧸',
      description: 'Soft & cuddly friends',
      path: '/shop/plushies',
      color: 'from-purple-200 to-purple-300'
    },
    {
      name: 'Lifestyle',
      icon: '🏠',
      description: 'Home & daily essentials',
      path: '/shop/lifestyle',
      color: 'from-blue-200 to-blue-300'
    },
    {
      name: 'Accessories',
      icon: '👜',
      description: 'Bags, jewelry & more',
      path: '/shop/accessories',
      color: 'from-green-200 to-green-300'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart! 🛍️",
      description: `${product.name} has been added to your cart`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Helmet>
        <title>Mewmii Bear's Shop - Cute Things for Happy Days 💕</title>
        <meta name="description" content="Welcome to Mewmii Bear's Shop! Discover adorable stationery, plushies, lifestyle items, and accessories. Cute things for happy days!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center kawaii-bounce">
                    <span className="text-3xl">🧸</span>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-pink-500">
                      Mewmii Bear
                    </h1>
                    <p className="text-lg text-gray-600">Cute Things for Happy Days 💕</p>
                  </div>
                </motion.div>
                
                <motion.p
                  className="text-xl text-gray-700 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Welcome to our kawaii wonderland! Discover adorable items that bring joy and cuteness to your everyday life.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/shop"
                  className="kawaii-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/shop/new"
                  className="border-2 border-pink-300 text-pink-600 font-semibold rounded-3xl px-8 py-4 hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Star size={20} />
                  <span>New Arrivals</span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex space-x-8 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { number: '1000+', label: 'Happy Customers' },
                  { number: '500+', label: 'Cute Products' },
                  { number: '50+', label: 'New Items Monthly' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-pink-500">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="kawaii-float">
                <img 
                  className="w-full h-auto rounded-3xl kawaii-shadow" 
                  alt="Mewmii Bear hero image with cute kawaii products"
                 src="https://images.unsplash.com/photo-1695747003440-df63b7b20e82" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center kawaii-pulse"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl">⭐</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center kawaii-bounce"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-xl">💕</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collections of kawaii items
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={category.path}
                  className="kawaii-card p-8 text-center space-y-4 kawaii-hover block"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto kawaii-float`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most loved kawaii items that customers can't get enough of!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kawaii-card overflow-hidden kawaii-hover"
              >
                <div className="relative">
                  <img 
                    className="w-full h-64 object-cover" 
                    alt={product.name}
                   src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center kawaii-shadow kawaii-hover opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart size={16} className="text-pink-500" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-2xl font-bold text-pink-500">${product.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="kawaii-button flex-1 flex items-center justify-center space-x-2"
                    >
                      <span>Add to Cart</span>
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="border-2 border-pink-300 text-pink-600 font-semibold rounded-2xl px-4 py-2 hover:bg-pink-50 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="kawaii-button inline-flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                {['🎁', '💕', '🌸', '⭐'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="text-4xl kawaii-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <h2 className="text-4xl font-bold text-white">
                Ready to Add Some Kawaii to Your Life?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of happy customers who've discovered the joy of kawaii living!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-white text-pink-500 font-bold rounded-3xl px-8 py-4 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 kawaii-shadow"
              >
                <Gift size={20} />
                <span>Start Shopping</span>
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white font-semibold rounded-3xl px-8 py-4 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Our Story</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;