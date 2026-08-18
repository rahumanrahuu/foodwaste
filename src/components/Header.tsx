"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  // Hide this header entirely if we're in the admin or delivery dashboards
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/delivery')) {
    return null;
  }

  return (
    <header className="header">
      <div className="logo">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Food <b style={{ color: "#06C167" }}>Donate</b>
        </Link>
      </div>
      <div className="hamburger" onClick={() => setIsActive(!isActive)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className={`nav-bar ${isActive ? 'active' : ''}`}>
        <ul>
          {user ? (
            <>
              <li><Link href="/" onClick={() => setIsActive(false)} className={pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li><Link href="/donate" onClick={() => setIsActive(false)} className={pathname === '/donate' ? 'active' : ''}>Donate</Link></li>
              <li><Link href="/profile" onClick={() => setIsActive(false)} className={pathname === '/profile' ? 'active' : ''}>Profile</Link></li>
              <li><Link href="/logout" onClick={() => setIsActive(false)}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link href="/" onClick={() => setIsActive(false)} className={pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li><Link href="/about" onClick={() => setIsActive(false)} className={pathname === '/about' ? 'active' : ''}>About</Link></li>
              <li><Link href="/contact" onClick={() => setIsActive(false)} className={pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
              <li><Link href="/login" onClick={() => setIsActive(false)} className={pathname === '/login' ? 'active' : ''}>Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
