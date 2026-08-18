"use client";
import React, { useState, useEffect } from 'react';
import DeliveryNavbar from '@/components/DeliveryNavbar';
import Link from 'next/link';

export default function DeliveryOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      // Show orders taken by this delivery person (for demo, any order that is "taken")
      setOrders(all.map((d, index) => ({ id: index + 1, ...d })).filter(d => d.taken));
    } catch {
      setOrders([]);
    }
  }, []);

  const handleDeliverOrder = (id: number) => {
    const updated = orders.map(o => o.id === id ? { ...o, taken: false, assigned: false } : o); // remove from active system or update status
    
    // In demo, we just remove it to simulate "delivered"
    setOrders(updated.filter(o => o.id !== id));
    
    // Update cache
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      if (all[id - 1]) {
        // mark completely finished
        all[id - 1].delivered = true;
        all[id - 1].taken = false;
        all[id - 1].assigned = false; 
      }
      localStorage.setItem('fd_donations', JSON.stringify(all));
    } catch {}

    alert("Awesome! You completed this delivery!");
  };

  return (
    <main>
      <DeliveryNavbar />
      
      <div className="table-section" style={{ padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>My Active Orders</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No</th>
                <th>Pickup Address</th>
                <th>Delivery Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={5}>You have no active orders. Go home to take a new one!</td></tr>
              ) : (
                orders.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.phoneno}</td>
                    <td>{row.address}</td>
                    <td>Local Charity Trust Center</td>
                    <td>
                      <button className="get-btn" style={{ background: 'blue' }} onClick={() => handleDeliverOrder(row.id)}>
                        Mark Delivered
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
