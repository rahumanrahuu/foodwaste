"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    // Clear user auth state
    logout();
    
    // Redirect cleanly to home log in selection
    router.replace('/');
  }, [logout, router]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#06C167', color: 'white' }}>
      <h2>Logging out...</h2>
    </div>
  );
}
