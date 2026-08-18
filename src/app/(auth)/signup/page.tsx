"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', gender: 'male' });
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { router.push('/signin'); return; }
      if (res.status === 409) { setError('Account already exists.'); setLoading(false); return; }
    } catch {
      // DB unavailable — save to localStorage cache
    }

    // localStorage fallback
    try {
      const existing: any[] = JSON.parse(localStorage.getItem('fd_registered_users') || '[]');
      if (existing.find(u => u.email === formData.email)) {
        setError('Account already exists.'); setLoading(false); return;
      }
      existing.push({ ...formData });
      localStorage.setItem('fd_registered_users', JSON.stringify(existing));
      router.push('/signin');
    } catch {
      setError('Sign up failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="auth-bg">
      <div className="regform">
        <form onSubmit={handleSubmit}>
          <p className="logo">Food <b style={{ color: "#06C167" }}>Donate</b></p>
          <p id="heading">Create your account</p>
          {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
          <div className="input">
            <label className="textlabel" htmlFor="name">User name</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="input">
            <label className="textlabel" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="input">
            <label className="textlabel" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
          </div>
          <div className="radio">
            <input type="radio" name="gender" id="male" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
            <label htmlFor="female">Female</label>
          </div>
          <div className="btn">
            <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Continue'}</button>
          </div>
          <div className="signin-up">
            <p>Already have an account? <Link href="/signin">Sign in</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
}
