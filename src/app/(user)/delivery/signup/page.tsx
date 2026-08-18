"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DeliverySignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', gender: 'male' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const existing: any[] = JSON.parse(localStorage.getItem('fd_delivery_users') || '[]');
      if (existing.find(u => u.email === formData.email)) {
        setError('Account already exists.');
        return;
      }
      existing.push({ ...formData });
      localStorage.setItem('fd_delivery_users', JSON.stringify(existing));
      router.push('/delivery/signin');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <main className="auth-bg">
      <div className="regform">
        <form onSubmit={handleSubmit}>
          <p className="logo">Food <b style={{ color: "#06C167" }}>Donate</b></p>
          <p id="heading">Create Delivery Account</p>
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
            <button type="submit">Sign Up</button>
          </div>
          <div className="signin-up">
            <p>Already have an account? <Link href="/delivery/signin">Sign in</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
}
