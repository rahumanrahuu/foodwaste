"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SigninPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const userData = await res.json();
        login(userData);
        router.push('/');
        return;
      }
    } catch {
      // DB unavailable — try localStorage fallback
    }

    // localStorage fallback
    try {
      const users: any[] = JSON.parse(localStorage.getItem('fd_registered_users') || '[]');
      const found = users.find(u => u.email === formData.email && u.password === formData.password);
      if (found) {
        login({ name: found.name, email: found.email, gender: found.gender, role: 'user' });
        router.push('/');
        return;
      }
      setError('Invalid email or password.');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-bg">
      <div className="regform">
        <form onSubmit={handleSubmit}>
          <p className="logo">Food <b style={{ color: "#06C167" }}>Donate</b></p>
          <p id="heading">Login</p>
          {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
          <div className="input">
            <label className="textlabel" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="input">
            <label className="textlabel" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
          </div>
          <div className="btn">
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </div>
          <div className="signin-up">
            <p>Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
}
