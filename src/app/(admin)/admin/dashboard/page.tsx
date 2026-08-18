"use client";
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", count: 85, icon: "uil-user", color: "box1" },
    { title: "Feedbacks", count: 12, icon: "uil-comments", color: "box2" },
    { title: "Total Donations", count: 42, icon: "uil-heart", color: "box3" }
  ];

  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    // Read from localStorage cache
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      setDonations(all.map((d, index) => ({ id: index + 1, ...d, assigned: d.assigned || false })));
    } catch {
      setDonations([]);
    }
  }, []);

  const handleGetFood = (id: number) => {
    const updated = donations.map(d => d.id === id ? { ...d, assigned: true } : d);
    setDonations(updated);
    
    // Update cache
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      if (all[id - 1]) all[id - 1].assigned = true;
      localStorage.setItem('fd_donations', JSON.stringify(all));
    } catch {}

    alert("Donation assigned to you for trust distribution!");
  };

  return (
    <div className="dash-content">
      <div className="overview">
        <div className="title">
          <i className="uil uil-tachometer-fast-alt"></i>
          <span className="text">Dashboard</span>
        </div>

        <div className="boxes">
          {stats.map((stat, i) => (
            <div key={i} className={`box ${stat.color}`}>
              <i className={`uil ${stat.icon}`}></i>
              <span className="text">{stat.title}</span>
              <span className="number">{stat.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="activity">
        <div className="title">
          <i className="uil uil-clock-three"></i>
          <span className="text">Recent Donations (Unassigned)</span>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Food</th>
                <th>Category</th>
                <th>Phone No</th>
                <th>Date/Time</th>
                <th>Address</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.filter(d => !d.assigned && !d.delivered).length === 0 ? (
                <tr><td colSpan={8}>No new donations</td></tr>
              ) : (
                donations.filter(d => !d.assigned && !d.delivered).map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.foodname}</td>
                    <td>{row.category}</td>
                    <td>{row.phoneno}</td>
                    <td>{row.date}</td>
                    <td>{row.address}</td>
                    <td>{row.quantity}</td>
                    <td>
                      <button className="get-btn" onClick={() => handleGetFood(row.id)}>
                        Get Food
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
