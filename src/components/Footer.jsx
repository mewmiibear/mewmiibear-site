import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from './UI/use-toast';

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
  <footer className="bg-[#ff7abc] border-t-2 border-kawaii-pink">
      <div className="container mx-auto px-4 py-12">
  <div className="grid grid-cols- md:grid-cols-4 gap-20">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/text-logo.png" alt="Mewmii Bear Logo" className="h-7" />
            </div>
            {/* <p className="text-gray-600 text-sm">
              Bringing kawaii culture and adorable items to make every day a little more magical! 💕
            </p> */}
            <div className="flex space-x-3 mt-2">
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded-full flex items-center justify-center kawaii-shadow kawaii-hover cursor-pointer" title="Instagram">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="https://xhslink.com/m/4Hp2T7yLcDz" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded-full flex items-center justify-center kawaii-shadow kawaii-hover cursor-pointer" title="TikTok">
                <img src="https://pbs.twimg.com/profile_images/1085393775705419776/Z2GERXNS_400x400.jpg" alt="RedNote" className="w-5 h-5" />
              </a>
              <a href="mailto:mewmiibear@gmail.com" className="w-8 h-8 bg-white rounded-full flex items-center justify-center kawaii-shadow kawaii-hover cursor-pointer" title="Email">
                <Mail className="w-5 h-5 text-pink-500" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-pink-400" />
                <span>hello@mewmiibear.com</span>
              </div>

              {/* //phone number not available */}
              {/* <div className="flex items-center space-x-2">
                <Phone size={14} className="text-pink-400" />
                <span>+60 1126637133</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-pink-400" />
                <span>Kawaii Land, Cute City</span>
              </div> */}

            
            </div>
            
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-800">Quick Links</span>
            <div className="space-y-2">
              {[
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
                { name: 'Japan Sanrio', path: '/shop/japanSanrio' },
                { name: 'Sanrio Inspired', path: '/shop/sanrioInspired' },
                { name: 'Plushies', path: '/shop/plushies' },
                { name: 'Accessories', path: '/shop/accessories' }
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

          {/* Newsletter */}
              <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2"></div>
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
              <span>© 2025 Mewmii Bear</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;