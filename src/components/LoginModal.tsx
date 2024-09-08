"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuthStore } from '@/app/api/UsersApi';

export default function LoginForm({ toggleView, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onLoginSuccess(); // Llamar a onLoginSuccess para mostrar el mensaje de bienvenida
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label htmlFor="email" className='sr-only'>Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail className="text-gray-400" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full pl-10 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>
          </div>
          
          <div className='mb-4'>
            <label htmlFor="password" className='sr-only'>Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock className="text-gray-400" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full pl-10 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>
          </div>

          <div className='flex items-center mb-6'>
            <button
              type="button"
              className='text-sm text-green-400 hover:underline'
              onClick={() => alert('Forgot password functionality')}
            >
              Forgot password?
            </button>
          </div>

          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
          </motion.button>
        </form>
      </div>

      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{" "}
          <button onClick={toggleView} className='text-green-400 hover:underline'>
            Sign up
          </button>
        </p>
      </div>
    </motion.div>
  );
}