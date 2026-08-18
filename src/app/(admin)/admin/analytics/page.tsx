"use client";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const userStats = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Users',
        data: [45, 30],
        backgroundColor: ['#06C167', 'blue'],
      },
    ],
  };

  const donationStats = {
    labels: ['Madurai', 'Chennai', 'Coimbatore'],
    datasets: [
      {
        label: 'Donations',
        data: [25, 15, 10],
        backgroundColor: ['#06C167', 'blue', 'red'],
      },
    ],
  };

  const options = (title: string) => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: { size: 18 }
      },
    },
  });

  return (
    <div className="dash-content">
      <div className="title" style={{ marginTop: '0' }}>
        <i className="uil uil-chart"></i>
        <span className="text">Analytics</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}>
          <Bar options={options('User details')} data={userStats} />
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}>
          <Bar options={options('Food donation details')} data={donationStats} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
