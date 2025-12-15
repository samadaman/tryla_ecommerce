import React from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import Footer from '@/component/footer';

export const metadata = {
  title: 'Contact Us | Krylaa',
  description: 'Get in touch with Krylaa. We\'d love to hear from you!',
};

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-gray-700" />,
      title: 'Our Location',
      description: '123 Fashion Street, Faridabaad',
      detail: 'New Delhi, 110001, India'
    },
    {
      icon: <Mail className="w-6 h-6 text-gray-700" />,
      title: 'Email Us',
      description: 'support@krylaa.com',
      detail: 'care@krylaa.com'
    },
    {
      icon: <Phone className="w-6 h-6 text-gray-700" />,
      title: 'Call Us',
      description: '+91 9xxxxxx',
      detail: 'Mon - Fri, 10:00 AM - 7:00 PM'
    },
    {
      icon: <Clock className="w-6 h-6 text-gray-700" />,
      title: 'Working Hours',
      description: 'Monday - Friday',
      detail: '10:00 AM - 7:00 PM IST'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center opacity-30" />
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <img className='rounded-full p-2' src="/images/logo.avif" alt="Krylaa Logo" width={80} height={80} />
            </div>
            <h2 className="text-2xl font-light tracking-widest mb-2">KRYLAA</h2>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <div className="w-20 h-0.5 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us with any questions or feedback.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="text-gray-500 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Contact Form */}
              <div className="w-full md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* Map */}
              <div className="w-full md:w-1/2 bg-gray-200">
                <div className="h-full w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.4315209975014!2d77.2060153150856!3d28.63236098241354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Krylaa Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What are your customer service hours?",
                answer: "Our customer service team is available Monday to Friday, 10:00 AM to 7:00 PM IST. We typically respond to all inquiries within 24-48 hours."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the courier's website."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unworn, unwashed items with original tags attached. Please refer to our Returns & Exchanges page for detailed instructions."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. You can view all shipping options at checkout."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
