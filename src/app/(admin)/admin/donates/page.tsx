"use client";
import React, { useState, useEffect } from 'react';

export default function AdminDonatesPage() {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      setDonations(all.map((d, index) => ({ id: index + 1, ...d, assigned: d.assigned || false })));
    } catch {
      setDonations([]);
    }
  }, []);

  return (
    <div className="dash-content">
      <div className="title">
        <i className="uil uil-heart"></i>
        <span className="text">All Donations</span>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Food</th>
              <th>Category</th>
              <th>Phone No</th>
              <th>Date/Time</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr><td colSpan={8}>No donations recorded.</td></tr>
            ) : (
              donations.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.foodname}</td>
                  <td>{row.category}</td>
                  <td>{row.phoneno}</td>
                  <td>{row.date}</td>
                  <td>{row.address}</td>
                  <td>
                    {row.taken ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>Delivered</span>
                    ) : row.assigned ? (
                      <span style={{ color: 'orange', fontWeight: 'bold' }}>Assigned</span>
                    ) : (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Pending</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
