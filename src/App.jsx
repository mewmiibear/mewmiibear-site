import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import NewsletterPopup from '@/components/NewsletterPopup';
import { CartProvider } from '@/contexts/CartContext';

function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenNewsletter = localStorage.getItem('mewmii-newsletter-seen');
      if (!hasSeenNewsletter) {
        setShowNewsletter(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewsletterClose = () => {
    setShowNewsletter(false);
    localStorage.setItem('mewmii-newsletter-seen', 'true');
  };

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Helmet>
            <title>Mewmii Bear's Shop - Cute Things for Happy Days 💕</title>
            <meta name="description" content="Discover adorable stationery, plushies, lifestyle items, and accessories at Mewmii Bear's Shop. Cute things for happy days!" />
          </Helmet>
          
          <Header />
          
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:category" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
          
          <AnimatePresence>
            {showNewsletter && (
              <NewsletterPopup onClose={handleNewsletterClose} />
            )}
          </AnimatePresence>
          
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;