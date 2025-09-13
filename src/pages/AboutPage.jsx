import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Star, Users, Gift } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: '💕',
      title: 'Spreading Joy',
      description: 'We believe cute things have the power to brighten anyone\'s day and bring smiles to faces around the world.'
    },
    {
      icon: '🌸',
      title: 'Quality First',
      description: 'Every product is carefully selected and tested to ensure it meets our high standards for cuteness and quality.'
    },
    {
      icon: '🧸',
      title: 'Kawaii Culture',
      description: 'We\'re passionate about sharing the beautiful kawaii culture and its message of finding joy in small things.'
    },
    {
      icon: '🌈',
      title: 'Community',
      description: 'Building a global community of kawaii lovers who appreciate the magic of cute, colorful, and happy things.'
    }
  ];

  const team = [
    {
      name: 'Mia Chen',
      role: 'Founder & Chief Kawaii Officer',
      image: 'Asian woman with pink hair and kawaii fashion style, smiling warmly',
      description: 'Mia started Mewmii Bear after falling in love with kawaii culture during her time in Japan. She believes everyone deserves a little more cuteness in their life!'
    },
    {
      name: 'Luna Rodriguez',
      role: 'Product Curator',
      image: 'Latina woman with colorful accessories and cute style, holding kawaii products',
      description: 'Luna has an eye for the most adorable products. She travels the world to find unique kawaii items that will make our customers smile.'
    },
    {
      name: 'Sakura Tanaka',
      role: 'Design Director',
      image: 'Japanese woman in kawaii Harajuku style with pastel colors and cute accessories',
      description: 'Born and raised in Tokyo, Sakura brings authentic kawaii aesthetics to everything we do, from our website to our packaging.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '1,000+', label: 'Cute Products' },
    { number: '25+', label: 'Countries Served' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <Helmet>
        <title>About Us - Mewmii Bear's Shop</title>
        <meta name="description" content="Learn about Mewmii Bear's Shop - our story, mission, and passion for bringing kawaii culture and cute things to the world!" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {['🧸', '💕', '🌸', '⭐'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="text-4xl kawaii-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <h1 className="text-5xl font-bold text-gray-800">Our Kawaii Story</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Welcome to Mewmii Bear's Shop, where every day is filled with cuteness, joy, and a little bit of magic! 💕
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">How It All Started</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  It all began with a simple belief: the world needs more cuteness! Our founder, Mia, discovered the magical world of kawaii culture during her travels to Japan in 2019. She was amazed by how small, cute things could bring such immense joy and positivity to people's daily lives.
                </p>
                <p>
                  Inspired by the smiles she saw on people's faces when they encountered something adorable, Mia decided to bring that same happiness to people around the world. She started collecting the most delightful kawaii items she could find, from the softest plushies to the most charming stationery.
                </p>
                <p>
                  What started as a small collection shared with friends quickly grew into a passion project, and eventually became Mewmii Bear's Shop - a place where kawaii dreams come true and every purchase brings a little more joy into the world! 🌈
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="kawaii-float">
                <img 
                  className="w-full h-auto rounded-3xl kawaii-shadow"
                  alt="Mewmii Bear shop founder story with kawaii products and Japanese inspiration"
                 src="https://images.unsplash.com/photo-1695747003440-df63b7b20e82" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center kawaii-pulse"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl">✨</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center kawaii-bounce"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-xl">🎀</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800">What We Believe In</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from product selection to customer service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kawaii-card p-8 text-center space-y-4 kawaii-hover"
              >
                <div className="text-4xl kawaii-float">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Our Kawaii Impact</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                See how we're spreading joy and cuteness around the world!
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800">Meet Our Kawaii Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The amazing people behind the cuteness who make the magic happen every day!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kawaii-card overflow-hidden kawaii-hover"
              >
                <img 
                  className="w-full h-64 object-cover"
                  alt={member.name}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="p-6 space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-pink-500 font-semibold">{member.role}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {['🌟', '💖', '🦄', '🌈'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="text-3xl kawaii-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
            </div>
            
            <div className="kawaii-card p-8 space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                "To bring joy, positivity, and a touch of magic to people's lives through carefully curated kawaii products that celebrate the beauty of cuteness and the power of small things to make big differences in our daily happiness."
              </p>
              
              <div className="flex justify-center space-x-8 pt-4">
                {[
                  { icon: Heart, label: 'Spread Love' },
                  { icon: Star, label: 'Create Magic' },
                  { icon: Users, label: 'Build Community' },
                  { icon: Gift, label: 'Share Joy' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-2 kawaii-hover">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;