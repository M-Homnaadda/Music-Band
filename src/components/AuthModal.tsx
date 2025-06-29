import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.firstName || !formData.lastName) {
        setError('First name and last name are required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        setSuccess('Successfully signed in!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              full_name: `${formData.firstName} ${formData.lastName}`,
            }
          }
        });

        if (error) throw error;

        setSuccess('Account created successfully! Please check your email to verify your account.');
        setTimeout(() => {
          setMode('signin');
          setSuccess('');
        }, 3000);
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MusicStore</h1>
              <p className="text-purple-200 text-sm">Your Musical Journey</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            {mode === 'signin' ? 'Welcome Back!' : 'Join Our Community'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Branding (Hidden on Mobile) */}
          <div className="hidden lg:block bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 xl:p-12 text-white relative overflow-hidden min-h-[600px]">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/30 rounded-full blur-3xl -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-purple-500/30 rounded-full blur-2xl translate-x-24 translate-y-24" />
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">MusicStore</h1>
                  <p className="text-purple-200 text-sm">Your Musical Journey Starts Here</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
                  {mode === 'signin' ? 'Welcome Back!' : 'Join Our Community'}
                </h2>
                <p className="text-purple-100 text-lg leading-relaxed">
                  {mode === 'signin' 
                    ? 'Sign in to access your account, view your orders, and discover amazing musical instruments.'
                    : 'Create your account to start shopping for premium musical instruments and join thousands of satisfied musicians.'
                  }
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-purple-100">Exclusive member discounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    <span className="text-purple-100">Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-purple-100">Early access to new products</span>
                  </div>
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors text-center">
                  Learn More
                </button>
                <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors text-center">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              {/* Header - Hidden on mobile (shown in mobile header) */}
              <div className="hidden lg:block text-center mb-6 xl:mb-8">
                <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-2">
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-gray-600 text-sm xl:text-base">
                  {mode === 'signin' 
                    ? 'Enter your credentials to access your account'
                    : 'Fill in your details to create a new account'
                  }
                </p>
              </div>

              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {mode === 'signin' 
                    ? 'Enter your credentials'
                    : 'Fill in your details'
                  }
                </p>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm sm:text-base"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm sm:text-base"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm sm:text-base"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm sm:text-base"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm sm:text-base"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-purple-600 hover:text-purple-700 transition-colors text-left sm:text-right"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-3.5 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              {/* Switch Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm sm:text-base">
                  {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={switchMode}
                    className="ml-1 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>

              {/* Mobile Features - Only shown on mobile */}
              <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>Exclusive member discounts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    <span>Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>Early access to new products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;