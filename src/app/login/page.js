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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save user data and token to localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Redirect to home page after successful login
      window.location.href = '/';
      
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
                className={`w-full py-3 cursor-pointer bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}
            
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
