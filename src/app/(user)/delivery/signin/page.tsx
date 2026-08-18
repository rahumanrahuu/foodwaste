"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DeliverySigninPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const users: any[] = JSON.parse(localStorage.getItem('fd_delivery_users') || '[]');
      const found = users.find(u => u.email === formData.email && u.password === formData.password);
      if (found) {
        login({ name: found.name, email: found.email, gender: found.gender, role: 'delivery' });
        router.push('/delivery/dashboard');
        return;
      }
      setError('Invalid email or password.');
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <main className="auth-bg">
      <div className="regform">
        <form onSubmit={handleSubmit}>
          <p className="logo">Food <b style={{ color: "#06C167" }}>Donate</b></p>
          <p id="heading">Delivery Login</p>
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
            <button type="submit">Login</button>
          </div>
          <div className="signin-up">
            <p>Don&apos;t have a delivery account? <Link href="/delivery/signup">Sign up</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
}
