"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DeliveryNavbar() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="logo">
        Food <b style={{ color: "#06C167" }}>Donate</b>
      </div>
      <div className="hamburger" onClick={() => setIsActive(!isActive)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className={`nav-bar ${isActive ? 'active' : ''}`}>
        <ul>
          <li>
            <Link href="/delivery/dashboard" className={pathname === '/delivery/dashboard' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link href="/delivery/map">Map</Link>
          </li>
          <li>
            <Link href="/delivery/orders">My Orders</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
