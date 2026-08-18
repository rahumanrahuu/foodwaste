"use client";
import React, { useState, useEffect } from 'react';
import DeliveryNavbar from '@/components/DeliveryNavbar';
import Link from 'next/link';

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Read from localStorage cache
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      // For this demo, we'll just show all donations that are assigned by admin but not yet picked up
      setOrders(all.map((d, index) => ({ id: index + 1, ...d, taken: d.taken || false })));
    } catch {
      setOrders([]);
    }
  }, []);

  const handleTakeOrder = (id: number) => {
    const updated = orders.map(o => o.id === id ? { ...o, taken: true } : o);
    setOrders(updated);
    
    // Update cache
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      if (all[id - 1]) all[id - 1].taken = true;
      localStorage.setItem('fd_donations', JSON.stringify(all));
    } catch {}

    alert("Order taken! View it in 'My Orders'.");
  };

  return (
    <main>
      <DeliveryNavbar />
      
      <div className="delivery-hero" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '30px', marginBottom: '20px' }}>Welcome, Delivery Partner</h2>
        <div className="hero-img">
          <img src="/img/delivery.gif" alt="Delivery Animation" style={{ maxWidth: '400px', borderRadius: '20px', width: '100%' }} />
        </div>
      </div>

      <div className="order-actions" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Link href="/delivery/orders" className="my-orders-btn" style={{ backgroundColor: '#06C167', color: 'white', padding: '10px 25px', borderRadius: '5px', textDecoration: 'none', fontSize: '20px', fontWeight: 500 }}>
          My Orders
        </Link>
      </div>

      <div className="table-section" style={{ padding: '0 40px 40px' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No</th>
                <th>Date/Time</th>
                <th>Pickup Address</th>
                <th>Delivery Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.filter(o => !o.taken && !o.delivered).length === 0 ? (
                <tr><td colSpan={6}>No active orders available right now.</td></tr>
              ) : (
                orders.filter(o => !o.taken && !o.delivered).map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.phoneno}</td>
                    <td>{row.date}</td>
                    <td>{row.address}</td>
                    <td>NGO / Trust</td>
                    <td>
                      <button className="get-btn" onClick={() => handleTakeOrder(row.id)}>
                        Take Order
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
