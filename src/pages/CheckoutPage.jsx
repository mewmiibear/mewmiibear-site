import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Lock, CreditCard, ArrowLeft, ShoppingBag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { items, getCartTotal } = useCart();
  const [step, setStep] = useState(1);
  
  const shippingCost = getCartTotal() >= 50 ? 0 : 7.99;
  const total = getCartTotal() + shippingCost;
  
  const handlePayment = (e) => {
    e.preventDefault();
    toast({
      title: "Payment Processing 💳",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <Helmet>
        <title>Checkout - Mewmii Bear's Shop</title>
        <meta name="description" content="Complete your kawaii purchase at Mewmii Bear's Shop. Secure and easy checkout." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">🌸</span>
            <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
          </div>
          <p className="text-xl text-gray-600">
            You're just a few steps away from your kawaii haul! 💕
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Steps */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Step 1: Shipping Information */}
            <div className="kawaii-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">1. Shipping Information</h2>
                {step > 1 && <button onClick={() => setStep(1)} className="text-sm text-pink-500 hover:underline">Edit</button>}
              </div>

              {step === 1 && (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="kawaii-input w-full" />
                    <input type="text" placeholder="Last Name" className="kawaii-input w-full" />
                  </div>
                  <input type="email" placeholder="Email Address" className="kawaii-input w-full" />
                  <input type="text" placeholder="Address" className="kawaii-input w-full" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="kawaii-input w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" className="kawaii-input w-full" />
                    <input type="text" placeholder="State/Province" className="kawaii-input w-full" />
                    <input type="text" placeholder="ZIP / Postal Code" className="kawaii-input w-full" />
                  </div>
                  <input type="text" placeholder="Country" className="kawaii-input w-full" value="United States" disabled />
                  
                  <button onClick={() => setStep(2)} className="kawaii-button w-full py-3 mt-4">Continue to Payment</button>
                </form>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className={`kawaii-card p-8 ${step < 2 ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">2. Payment Method</h2>
                {step > 2 && <button onClick={() => setStep(2)} className="text-sm text-pink-500 hover:underline">Edit</button>}
              </div>

              {step === 2 && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Pay with Card</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={16} />
                        <input type="text" placeholder="Card Number" className="kawaii-input w-full pl-10" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM / YY" className="kawaii-input w-full" />
                        <input type="text" placeholder="CVC" className="kawaii-input w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-4"></div>

                  <div className="space-y-3">
                    <h3 className="font-semibold mb-3">Or use another method:</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['PayPal', 'Shop Pay', 'G Pay'].map((method) => (
                        <button key={method} type="button" onClick={() => toast({ title: `${method} Payment`, description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="kawaii-button w-full flex items-center justify-center space-x-2 text-lg py-4 mt-6">
                    <Lock size={20} />
                    <span>Pay ${total.toFixed(2)}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="kawaii-card p-8 space-y-6 h-fit"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
              <Link to="/cart" className="text-sm text-pink-500 hover:underline">Edit Cart</Link>
            </div>
            
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      className="w-16 h-16 rounded-lg object-cover"
                      alt={item.name}
                     src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                  </div>
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 my-4"></div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-800">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between text-2xl font-bold">
              <span className="text-gray-800">Total</span>
              <span className="text-pink-500">${total.toFixed(2)}</span>
            </div>

            <div className="text-sm text-gray-500 flex items-start space-x-2 mt-4">
              <Lock size={20} className="flex-shrink-0 mt-0.5" />
              <span>
                Your payment is secure. We use industry-standard encryption to protect your information.
              </span>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Return to Cart</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;