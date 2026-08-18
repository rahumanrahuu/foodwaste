"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminSigninPage() {
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

    // Hardcoded admin for demo since admins usually don't sign up
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin123') {
      login({ name: 'Super Admin', email: formData.email, gender: 'male', role: 'admin' });
      router.push('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. Use admin@gmail.com / admin123');
    }
  };

  return (
    <main className="auth-bg">
      <div className="regform">
        <form onSubmit={handleSubmit}>
          <p className="logo">Food <b style={{ color: "#06C167" }}>Donate</b></p>
          <p id="heading">Admin Login</p>
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
        </form>
      </div>
    </main>
  );
}
