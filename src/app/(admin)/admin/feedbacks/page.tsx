"use client";
import React, { useState, useEffect } from 'react';

export default function AdminFeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_feedbacks') || '[]');
      setFeedbacks(all);
    } catch {
      setFeedbacks([]);
    }
  }, []);

  return (
    <div className="dash-content">
      <div className="title">
        <i className="uil uil-comments"></i>
        <span className="text">User Feedbacks</span>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr><td colSpan={4}>No feedbacks received yet.</td></tr>
            ) : (
              feedbacks.map((row, i) => (
                <tr key={i}>
                  <td>{new Date(row.date).toLocaleString()}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td style={{ textAlign: 'left' }}>{row.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
