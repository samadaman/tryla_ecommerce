'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/component/header';
import BelowNavLinks from '@/component/belowNavLinks';
import Footer from '@/component/footer';




export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', formData);
  };

  return (
    <>
    <Header />
    <BelowNavLinks />
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-800">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>
        
        <div className="p-8 rounded-lg ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div >
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 font-medium text-gray-600 border border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors bg-gray-100"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 font-medium text-gray-600 border border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors bg-gray-100"
                placeholder="Password"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 cursor-pointer bg-black text-white font-medium  rounded-md hover:bg-gray-800 transition-colors"
              >
                Sign in
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <span>Don't have an account? </span>
              <Link href="/signup" className="text-black hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <Link href="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
