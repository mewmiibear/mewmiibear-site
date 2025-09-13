import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, Heart, Gift, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from '../components/UI/use-toast';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    toast({
      title: "Apply Coupon 🎟️",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
  
  const shippingCost = getCartTotal() >= 50 ? 0 : 7.99;
  const total = getCartTotal() + shippingCost;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <Helmet>
        <title>Your Cart - Mewmii Bear's Shop</title>
        <meta name="description" content="Review your kawaii items in your shopping cart at Mewmii Bear's Shop." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">🛍️</span>
            <h1 className="text-4xl font-bold text-gray-800">Your Shopping Cart</h1>
          </div>
          <p className="text-xl text-gray-600">
            {items.length > 0
              ? `You have ${items.length} adorable items in your cart!`
              : "Your cart is empty... let's find something cute! 💕"}
          </p>
        </motion.div>
        
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 kawaii-bounce">🛒💨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is a Bit Lonely</h3>
            <p className="text-gray-600 mb-6">Explore our collections and fill it with kawaii goodness!</p>
            <Link
              to="/shop"
              className="kawaii-button inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="kawaii-card flex items-center p-4 kawaii-hover"
                >
                  <img 
                    className="w-24 h-24 rounded-lg object-cover"
                    alt={item.name}
                   src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                  
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                    <p className="text-lg font-bold text-pink-500">${item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Quantity Control */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    {/* Item Total */}
                    <div className="w-24 text-right">
                      <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="mt-8 flex justify-between items-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-semibold"
                >
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toast({
                      title: "Wishlist ❤️",
                      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="flex items-center space-x-2 text-gray-600 hover:text-pink-500"
                  >
                    <Heart size={16} />
                    <span>Move to Wishlist</span>
                  </button>
                  <button
                    onClick={() => toast({
                      title: "Share Cart 📤",
                      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="flex items-center space-x-2 text-gray-600 hover:text-pink-500"
                  >
                    <Gift size={16} />
                    <span>Share Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="kawaii-card p-8 space-y-6 h-fit"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">${getCartTotal().toFixed(2)}</span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-800">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              {/* Free Shipping Message */}
              {getCartTotal() < 50 && (
                <div className="bg-pink-100 text-pink-800 text-sm p-3 rounded-lg text-center">
                  Add <strong>${(50 - getCartTotal()).toFixed(2)}</strong> more to get free shipping! 🎉
                </div>
              )}

              {/* Coupon Code */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label htmlFor="coupon" className="text-sm font-semibold text-gray-700">Have a coupon code? 🎟️</label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="kawaii-input flex-1 rounded-r-none"
                    placeholder="Enter code"
                  />
                  <button type="submit" className="kawaii-button rounded-l-none">Apply</button>
                </div>
              </form>
              
              <div className="border-t border-gray-200 my-4"></div>

              {/* Total */}
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-gray-800">Total</span>
                <span className="text-pink-500">${total.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout" className="w-full">
                <button
                  className="kawaii-button w-full flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <ShoppingBag size={20} />
                  <span>Proceed to Checkout</span>
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;