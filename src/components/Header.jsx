import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from './UI/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { getCartItemsCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "🔍 Search Feature",
        description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
    }
  };

  const socialLinks = [
    { name: '小红书', icon: '📱', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'TikTok', icon: '🎵', url: '#' }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-kawaii-pink shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 kawaii-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center kawaii-bounce">
              <span className="text-2xl">🧸</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pink-500">Mewmii Bear</h1>
              <p className="text-xs text-gray-500">Cute Things for Happy Days</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold transition-colors kawaii-hover ${
                  location.pathname === link.path
                    ? 'text-pink-500'
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cute things..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="kawaii-input w-48 pr-10 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => toast({
                    title: `${social.icon} ${social.name}`,
                    description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  })}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center kawaii-hover text-sm"
                  title={social.name}
                >
                  {social.icon}
                </button>
              ))}
            </div>


            {/* Profile/Login */}
            <Link to="/profile" className="kawaii-hover" title="Profile / Login">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative kawaii-hover">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
              {getCartItemsCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold kawaii-pulse"
                >
                  {getCartItemsCount()}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center kawaii-hover"
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-kawaii-pink py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'text-pink-500'
                      : 'text-gray-600 hover:text-pink-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* Profile/Login (Mobile) */}
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold transition-colors ${location.pathname === "/profile" ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
              >
                Profile
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search cute things..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="kawaii-input w-full pr-10 text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </form>

              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 pt-2">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => {
                      setIsMenuOpen(false);
                      toast({
                        title: `${social.icon} ${social.name}`,
                        description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      });
                    }}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-pink-500"
                  >
                    <span>{social.icon}</span>
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;