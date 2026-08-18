"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  // Hide footer entirely on admin or delivery dashbaords
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/delivery')) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-left">
        <p className="about">
          <span>About us</span>
          The basic concept of this project Food Waste Management is to collect the excess/leftover food from donors such as hotels, restaurants, marriage halls, etc. and distribute to the needy people.
        </p>
      </div>
      <div className="footer-center">
        <div><p><span>Contact</span></p></div>
        <div><p><br/><a href="mailto:rahumanabdul8618@gmail.com">rahumanabdul8618@gmail.com</a></p></div>
      </div>
      <div className="footer-right">
        <h2>Food<span> Donate</span></h2>
        <p className="menu">
          <Link href="/">Home</Link> |
          <Link href="/about">About</Link> |
          <Link href="/profile">Profile</Link> |
          <Link href="/contact">Contact</Link>
        </p>
        <p className="name">Food Donate &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
