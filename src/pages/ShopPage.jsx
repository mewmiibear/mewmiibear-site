import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const ShopPage = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'stationery', name: 'Stationery', icon: '📝' },
    { id: 'plushies', name: 'Plushies', icon: '🧸' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '🏠' },
    { id: 'accessories', name: 'Accessories', icon: '👜' }
  ];

  const products = [
    {
      id: 1,
      name: 'Kawaii Bear Notebook',
      price: 24.99,
      originalPrice: 29.99,
      image: 'Cute pink notebook with kawaii bear design and pastel colors',
      category: 'stationery',
      rating: 4.8,
      reviews: 124,
      badge: 'Sale',
      inStock: true
    },
    {
      id: 2,
      name: 'Fluffy Cloud Plushie',
      price: 34.99,
      image: 'Soft white cloud plushie with rainbow details and kawaii face',
      category: 'plushies',
      rating: 4.9,
      reviews: 89,
      badge: 'Bestseller',
      inStock: true
    },
    {
      id: 3,
      name: 'Pastel Mug Set',
      price: 29.99,
      image: 'Set of pastel colored mugs with cute animal faces',
      category: 'lifestyle',
      rating: 4.7,
      reviews: 156,
      badge: 'Limited',
      inStock: true
    },
    {
      id: 4,
      name: 'Unicorn Pen Set',
      price: 19.99,
      image: 'Colorful unicorn-themed gel pens with glitter',
      category: 'stationery',
      rating: 4.6,
      reviews: 203,
      badge: 'New',
      inStock: true
    },
    {
      id: 5,
      name: 'Cat Ear Headband',
      price: 15.99,
      image: 'Cute cat ear headband in pastel pink with bow',
      category: 'accessories',
      rating: 4.5,
      reviews: 78,
      inStock: false
    },
    {
      id: 6,
      name: 'Kawaii Desk Organizer',
      price: 39.99,
      image: 'Pink desk organizer with multiple compartments and cute design',
      category: 'lifestyle',
      rating: 4.8,
      reviews: 92,
      badge: 'Popular',
      inStock: true
    },
    {
      id: 7,
      name: 'Mini Bear Plushie Keychain',
      price: 12.99,
      image: 'Small bear plushie keychain in various pastel colors',
      category: 'accessories',
      rating: 4.7,
      reviews: 167,
      inStock: true
    },
    {
      id: 8,
      name: 'Sakura Sticky Notes',
      price: 8.99,
      image: 'Cherry blossom themed sticky notes in pink and white',
      category: 'stationery',
      rating: 4.4,
      reviews: 134,
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    if (category && category !== 'all' && product.category !== category) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock 😢",
        description: "This item is currently out of stock. Check back soon!"
      });
      return;
    }
    
    addToCart(product);
    toast({
      title: "Added to cart! 🛍️",
      description: `${product.name} has been added to your cart`
    });
  };

  const currentCategory = categories.find(cat => cat.id === (category || 'all'));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <Helmet>
        <title>{currentCategory?.name || 'Shop'} - Mewmii Bear's Shop</title>
        <meta name="description" content={`Shop ${currentCategory?.name.toLowerCase() || 'all products'} at Mewmii Bear's Shop. Cute and kawaii items for happy days!`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">{currentCategory?.icon}</span>
            <h1 className="text-4xl font-bold text-gray-800">{currentCategory?.name}</h1>
          </div>
          <p className="text-xl text-gray-600">
            {filteredProducts.length} adorable items waiting for you!
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/shop' : `/shop/${cat.id}`}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all kawaii-hover ${
                (category || 'all') === cat.id
                  ? 'bg-pink-500 text-white kawaii-shadow'
                  : 'bg-white text-gray-600 hover:bg-pink-50 border-2 border-pink-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border-2 border-pink-200 hover:bg-pink-50 transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="kawaii-input"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="kawaii-card p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">In Stock</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Out of Stock</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`kawaii-card overflow-hidden kawaii-hover group ${
                viewMode === 'list' ? 'flex' : ''
              } ${!product.inStock ? 'opacity-75' : ''}`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <img 
                  className={`w-full object-cover ${viewMode === 'list' ? 'h-48' : 'h-64'}`}
                  alt={product.name}
                 src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      product.badge === 'Sale' ? 'bg-red-500' :
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Bestseller' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
                
                <button
                  onClick={() => toast({
                    title: "Wishlist ❤️",
                    description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  })}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center kawaii-shadow kawaii-hover opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart size={16} className="text-pink-500" />
                </button>
              </div>
              
              <div className={`p-6 space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-pink-500">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`kawaii-button flex-1 flex items-center justify-center space-x-2 ${
                      !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
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
        </motion.div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or browse all categories</p>
            <Link
              to="/shop"
              className="kawaii-button inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ShopPage;