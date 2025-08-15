'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/component/header';
import BelowNavLinks from '@/component/belowNavLinks';
import Footer from '@/component/footer';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      window.location.href = '/';
      
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
      console.error('Signup error:', err);
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
            <h1 className="text-2xl font-light text-gray-800">Create your account</h1>
            <p className="mt-2 text-sm text-gray-500">Join us today</p>
          </div>
          
          <div className="p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 font-medium text-gray-600 border border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors bg-gray-100"
                  placeholder="Full name"
                />
              </div>
              
              <div>
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
              
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 font-medium text-gray-600 border border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors bg-gray-100"
                  placeholder="Confirm password"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 cursor-pointer bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                  {error}
                </div>
              )}
              
              <div className="text-center text-sm text-gray-500 pt-4">
                <span>Already have an account? </span>
                <Link href="/login" className="text-black hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
