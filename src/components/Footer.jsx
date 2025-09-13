import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleSocialClick = (platform) => {
    toast({
      title: `${platform} 💕`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Newsletter Signup 📧",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <footer className="bg-gradient-to-br from-pink-50 to-purple-50 border-t-2 border-kawaii-pink">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center kawaii-float">
                <span className="text-xl">🧸</span>
              </div>
              <div>
                <span className="text-xl font-bold text-pink-500">Mewmii Bear</span>
                <p className="text-xs text-gray-500">Cute Things for Happy Days</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Bringing kawaii culture and adorable items to make every day a little more magical! 💕
            </p>
            <div className="flex space-x-3">
              {['🧸', '💕', '🌸', '🎀'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center kawaii-shadow kawaii-hover cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleSocialClick('Kawaii Emojis')}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-800">Quick Links</span>
            <div className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop All', path: '/shop' },
                { name: 'New Arrivals', path: '/shop/new' },
                { name: 'Best Sellers', path: '/shop/bestsellers' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-600 hover:text-pink-500 transition-colors text-sm kawaii-hover"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-800">Categories</span>
            <div className="space-y-2">
              {[
                { name: '📝 Stationery', path: '/shop/stationery' },
                { name: '🧸 Plushies', path: '/shop/plushies' },
                { name: '🏠 Lifestyle', path: '/shop/lifestyle' },
                { name: '👜 Accessories', path: '/shop/accessories' }
              ].map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block text-gray-600 hover:text-pink-500 transition-colors text-sm kawaii-hover"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-800">Stay Connected</span>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-pink-400" />
                <span>hello@mewmiibear.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-pink-400" />
                <span>+1 (555) KAWAII</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-pink-400" />
                <span>Kawaii Land, Cute City</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Join the Mewmii Bear Club! 💕</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="kawaii-input w-full text-sm"
                />
                <button
                  type="submit"
                  className="kawaii-button w-full text-sm py-2"
                >
                  Subscribe 💌
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Follow us:</p>
              <div className="flex space-x-2">
                {[
                  { name: '小红书', icon: '📱' },
                  { name: 'Instagram', icon: '📷' },
                  { name: 'TikTok', icon: '🎵' }
                ].map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name)}
                    className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center kawaii-hover text-sm"
                    title={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-kawaii-pink mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 flex items-center">
              Made with <Heart size={14} className="text-pink-500 mx-1" /> by Mewmii Bear Team
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <button
                onClick={() => toast({
                  title: "Privacy Policy 🔒",
                  description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                })}
                className="hover:text-pink-500 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => toast({
                  title: "Terms of Service 📋",
                  description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                })}
                className="hover:text-pink-500 transition-colors"
              >
                Terms of Service
              </button>
              <span>© 2024 Mewmii Bear's Shop</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;