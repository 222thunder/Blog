import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../services/auth';
import { login as authLogin } from '../store/authSlice';
import { Container, Logo } from '../components';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const session = await authService.login(email, password);
      if (session && session.user) {
        dispatch(authLogin({ userData: session.user }));
        navigate('/');
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-160px)] py-12">
      <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-white/10 shadow-xl">
        <div className="mb-8 flex justify-center">
          <span className="inline-block w-full max-w-[100px] text-center">
            <Logo size="lg" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight tracking-tight text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="font-medium text-indigo-400 transition-all duration-200 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-4 bg-red-900/20 p-2 rounded">{error}</p>}
        <form onSubmit={login} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium text-sm">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 active:scale-[0.98] transition-all duration-150"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 active:scale-[0.98] transition-all duration-150"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
