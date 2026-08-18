"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav">
      <div className="logo-name">
        <span className="logo_name">ADMIN</span>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          <li>
            <Link href="/admin/dashboard" className={pathname === '/admin/dashboard' ? 'active' : ''}>
              <i className="uil uil-estate"></i>
              <span className="link-name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics" className={pathname === '/admin/analytics' ? 'active' : ''}>
              <i className="uil uil-chart"></i>
              <span className="link-name">Analytics</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/donates" className={pathname === '/admin/donates' ? 'active' : ''}>
              <i className="uil uil-heart"></i>
              <span className="link-name">Donates</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/feedbacks" className={pathname === '/admin/feedbacks' ? 'active' : ''}>
              <i className="uil uil-comments"></i>
              <span className="link-name">Feedbacks</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/profile" className={pathname === '/admin/profile' ? 'active' : ''}>
              <i className="uil uil-user"></i>
              <span className="link-name">Profile</span>
            </Link>
          </li>
        </ul>
        
        <ul className="logout-mode">
          <li>
            <Link href="/logout">
              <i className="uil uil-signout"></i>
              <span className="link-name">Logout</span>
            </Link>
          </li>
          <li style={{ marginTop: '20px', padding: '0 10px' }}>
            <button 
              onClick={async () => {
                if (confirm("This will synchronize your database with the latest schema. Proceed?")) {
                  try {
                    const res = await fetch('/api/init');
                    const data = await res.json();
                    alert(data.message);
                  } catch (err) {
                    alert("Database synchronization failed. Please check your .env configuration.");
                  }
                }
              }}
              style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#94a3b8', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
            >
              Sync Database
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
