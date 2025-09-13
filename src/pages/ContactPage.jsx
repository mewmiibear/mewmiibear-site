import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Heart } from 'lucide-react';
import { toast } from '../components/UI/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent! 💌",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@mewmiibear.com',
      description: 'Send us your questions anytime!'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) KAWAII',
      description: 'Mon-Fri, 9AM-6PM PST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Kawaii Street, Cute City, CC 12345',
      description: 'Our kawaii headquarters!'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM PST',
      description: 'We respond within 24 hours'
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'We offer free shipping on orders over $50! Standard shipping takes 3-7 business days, while express shipping takes 1-3 business days.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship to over 25 countries worldwide. International shipping times vary by location but typically take 7-14 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in original condition. If you\'re not completely happy with your kawaii purchase, we\'ll make it right!'
    },
    {
      question: 'Are your products authentic?',
      answer: 'Absolutely! We work directly with manufacturers and authorized distributors to ensure all our kawaii products are 100% authentic and high-quality.'
    }
  ];

  const socialLinks = [
    { name: '小红书', icon: '📱', color: 'from-red-400 to-red-500' },
    { name: 'Instagram', icon: '📷', color: 'from-pink-400 to-purple-500' },
    { name: 'TikTok', icon: '🎵', color: 'from-gray-800 to-gray-900' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <Helmet>
        <title>Contact Us - Mewmii Bear's Shop</title>
        <meta name="description" content="Get in touch with Mewmii Bear's Shop! We'd love to hear from you. Contact us for questions, support, or just to say hello!" />
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
                {['💌', '🧸', '💕', '🌸'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="text-4xl kawaii-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <h1 className="text-5xl font-bold text-gray-800">Let's Chat!</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, we're here to help make your kawaii experience amazing! 💕
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="kawaii-card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="kawaii-input w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="kawaii-input w-full"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="kawaii-input w-full"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Question</option>
                  <option value="shipping">Shipping & Returns</option>
                  <option value="product">Product Information</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="kawaii-input w-full resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="kawaii-button w-full flex items-center justify-center space-x-2 text-lg py-4"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
              <p className="text-gray-600">
                Here are all the ways you can reach our kawaii team!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="kawaii-card p-6 kawaii-hover"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center kawaii-float">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{info.title}</h3>
                      <p className="text-pink-600 font-semibold">{info.details}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="kawaii-card p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-4">
                Stay connected for the latest kawaii updates and behind-the-scenes content!
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => toast({
                      title: `${social.icon} ${social.name}`,
                      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${social.color} text-white rounded-full font-semibold kawaii-hover`}
                  >
                    <span>{social.icon}</span>
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our kawaii products and services!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kawaii-card p-6 space-y-3"
              >
                <h3 className="text-lg font-bold text-gray-800">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="kawaii-card p-12 bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="space-y-6">
              <div className="flex justify-center space-x-2">
                {['💝', '🌟', '🦄', '💖'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="text-3xl kawaii-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't hesitate to reach out! Our kawaii team is always happy to help and loves connecting with our amazing community! 💕
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => toast({
                    title: "Live Chat 💬",
                    description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  })}
                  className="bg-white text-pink-500 font-bold rounded-3xl px-8 py-4 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 kawaii-shadow"
                >
                  <Heart size={20} />
                  <span>Start a Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;