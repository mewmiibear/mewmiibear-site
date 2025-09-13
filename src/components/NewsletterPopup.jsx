import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Heart } from 'lucide-react';
import { toast } from './UI/use-toast';

const NewsletterPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Mewmii Bear Club! 💕",
        description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="kawaii-card max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="text-center space-y-6">
          {/* Cute Header */}
          <div className="space-y-2">
            <div className="flex justify-center space-x-2">
              {['🧸', '💕', '🌸'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="text-3xl kawaii-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-pink-500">
              Join the Mewmii Bear Club!
            </h2>
            <p className="text-gray-600">
              Get exclusive access to new arrivals, special discounts, and kawaii surprises! 💌
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 text-left">
            {[
              '🎁 10% off your first order',
              '⭐ Early access to new collections',
              '💝 Exclusive kawaii content',
              '🎉 Special birthday surprises'
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-sm text-gray-600"
              >
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={16} />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="kawaii-input w-full pl-10"
                required
              />
            </div>
            <button
              type="submit"
              className="kawaii-button w-full flex items-center justify-center space-x-2"
            >
              <Heart size={16} />
              <span>Join the Club!</span>
            </button>
          </form>

          <p className="text-xs text-gray-500">
            No spam, just kawaii vibes! Unsubscribe anytime. 🌸
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsletterPopup;