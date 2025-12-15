import React from 'react';
import Image from 'next/image';
import Footer from '@/component/footer';

const AboutPage = () => {
  const values = [
    {
      title: 'Modern, Versatile Designs',
      description: 'Inspired by global trends, crafted for real life.'
    },
    {
      title: 'Premium Quality',
      description: 'Using durable, skin-friendly, and responsibly sourced materials.'
    },
    {
      title: 'Accessible Pricing',
      description: 'Luxury-inspired fashion without the premium price tag.'
    },
    {
      title: 'Global Reach',
      description: 'Serving customers across India, USA, UK, Europe, and beyond.'
    }
  ];

  const collections = [
    "Women's & Men's Wear",
    "Everyday Casuals & Smart Formals",
    "Seasonal & Limited-Edition Collections",
    "Gift Options and Easy Exchanges"
  ];

  const contactInfo = [
    { label: 'Email', value: 'support@krylaa.com' },
    { label: 'WhatsApp', value: '+91 9xxxxxx' },
    { label: 'Head Office', value: 'Delhi, 110006, India' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black text-white h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10" />
        
        <div className="container mx-auto px-6 z-20 text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <Image className='rounded-full p-2' src="/images/logo.avif" alt="Logo" width={100} height={100} />
            </div>
            <h2 className="text-2xl font-light tracking-widest mb-2">KRYLAA</h2>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Timeless design meets everyday comfort
          </p>
          
          <div className="mt-12">
            <div className="w-24 h-0.5 bg-white/50 mx-auto mb-4"></div>
            <p className="text-gray-300 uppercase text-sm tracking-wider">Since 2020</p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 font-bold mb-6">Welcome to Krylaa</h2>
            <div className="w-20 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Founded in India, Krylaa was created with a simple vision: to make high-quality, stylish, and accessible clothing for people around the world. From modern essentials to statement pieces, every collection reflects our belief that fashion should inspire confidence and individuality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-2xl text-gray-700 font-semibold mb-4">Our Philosophy</h3>
              <p className="text-gray-700 leading-relaxed">
                At Krylaa, we see fashion as more than just clothing—it's self-expression. Our goal is to design pieces that fit seamlessly into your lifestyle, offering a perfect balance of comfort, quality, and style. We combine global fashion insights with local craftsmanship to create apparel that feels international yet approachable.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl text-gray-700 font-semibold mb-4">Our Collections</h3>
              <ul className="space-y-3">
                {collections.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="block w-1 h-1 bg-black rounded-full mt-3 mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 font-bold mb-4">Why Choose Krylaa</h2>
            <div className="w-20 h-0.5 bg-black mx-auto mb-12"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="h-full bg-white p-8 rounded-lg transition-all duration-300 hover:shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 font-bold mb-6">Our Commitment</h2>
            <div className="w-20 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-gray-700 leading-relaxed">
              We're more than a clothing brand—we're a community built on trust, creativity, and authenticity. From product design to customer care, our team ensures every Krylaa experience reflects our dedication to excellence and satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 font-bold mb-6">Get In Touch</h2>
            <div className="w-20 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-gray-700 mb-12">
              We'd love to hear from you. Reach out to our team for any inquiries or support.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-2xl mx-auto">
              {contactInfo.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{item.label}</h4>
                  <p className="text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl text-gray-700 font-bold mb-6">Global Presence</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Serving customers across India, the USA, UK, Europe, and beyond with trusted logistics partners and secure shopping experiences.
          </p>
          <div className="mt-12 pt-8 border-t border-gray-800 max-w-4xl mx-auto">
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
