"use client";
import React, { useState, useEffect } from 'react';
import DeliveryNavbar from '@/components/DeliveryNavbar';
import Link from 'next/link';

export default function DeliveryMapPage() {
  const [activeLocations, setActiveLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    try {
      const all: any[] = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      // Filter the donations to only those that have a location (lat, lng) and have not been delivered
      const available = all.map((d, index) => ({ id: index + 1, ...d }))
                           .filter(d => d.lat && d.lng && !d.delivered);
      setActiveLocations(available);
      if (available.length > 0) {
        setSelectedLocation(available[0]);
      }
    } catch {
      setActiveLocations([]);
    }
  }, []);

  return (
    <main>
      <DeliveryNavbar />
      
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Live Delivery Tracker Map</h2>
        
        {activeLocations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', background: '#f5f5f5', borderRadius: '12px' }}>
            <h3>No active donations with GPS locations found right now.</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}>
              <h3>Available Pickups</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                {activeLocations.map((loc) => (
                  <li 
                    key={loc.id} 
                    onClick={() => setSelectedLocation(loc)}
                    style={{ 
                      padding: '15px', 
                      marginBottom: '10px', 
                      background: selectedLocation?.id === loc.id ? '#e0f7ea' : '#f9f9f9', 
                      border: selectedLocation?.id === loc.id ? '2px solid #06C167' : '1px solid #ddd',
                      borderRadius: '8px', 
                      cursor: 'pointer' 
                    }}
                  >
                    <strong>{loc.foodname}</strong> <span>({loc.category})</span><br/>
                    <small style={{ color: '#666' }}>Donor: {loc.name}</small><br/>
                    <small style={{ color: '#06C167' }}>Coordinates: {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ flex: '2', minWidth: '400px', height: '600px', background: '#e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
              {selectedLocation ? (
                <iframe 
                  src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <p>Select a location to view on map</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
