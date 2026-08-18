"use client";
import React from 'react';
import Link from 'next/link';

export default function AdminProfilePage() {
  return (
    <div className="dash-content">
      <div className="title">
        <i className="uil uil-user"></i>
        <span className="text">Admin Profile</span>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 10px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img src="/img/user.png" alt="Admin Avatar" style={{ width: '80px', borderRadius: '50%', marginRight: '20px' }} />
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Super Admin</h2>
            <p style={{ color: '#707070' }}>Administrator</p>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <div style={{ lineHeight: '2' }}>
          <p><strong>Email:</strong> rahumanabdul8618@gmail.com</p>
          <p><strong>Privileges:</strong> Full System Access</p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link href="/logout" style={{ background: '#06C167', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 500 }}>
            Logout securely
          </Link>
        </div>
      </div>
    </div>
  );
}
