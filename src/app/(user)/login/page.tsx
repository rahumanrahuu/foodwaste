"use client";
import React from 'react';
import Link from 'next/link';

export default function RoleSelectionPage() {
  return (
    <main className="role-selection">
      <p className="logo-main">Welcome to Food <b style={{ color: "#06C167" }}>Donate</b></p>
      <p className="para-main">Login as</p>
      <div className="log-container">
        <Link href="/signin">User</Link>
        <Link href="/admin/signin">Admin</Link>
        <Link href="/delivery/signin">Delivery</Link>
      </div>
    </main>
  );
}
