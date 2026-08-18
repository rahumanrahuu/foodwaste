"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DonatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    foodname: '',
    meal: 'veg',
    category: 'cooked-food',
    quantity: '',
    name: user?.name || '',
    phoneno: '',
    address: ''
  });
  
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      }, () => {
        alert("Failed to access your location. Please check browser permissions.");
        setIsLocating(false);
      });
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      alert("You MUST click 'Locate Me' to provide your precise location for the delivery driver before submitting!");
      return;
    }

    const newDonation = {
      ...formData,
      lat: location.lat,
      lng: location.lng,
      email: user?.email || 'guest@example.com',
      date: new Date().toLocaleString(),
    };

    // Try saving to DB first
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDonation),
      });
      if (res.ok) {
        alert("Donation successfully saved to database!");
        router.push('/');
        return;
      }
    } catch (err) {
      console.warn("DB connection failed, falling back to localStorage", err);
    }

    // Fallback if DB is unavailable
    const existing = JSON.parse(localStorage.getItem('fd_donations') || '[]');
    existing.push(newDonation);
    localStorage.setItem('fd_donations', JSON.stringify(existing));

    alert("Donation saved to local cache (Database is currently offline). Redirecting to home...");
    router.push('/');
  };

  return (
    <main className="auth-bg">
      <div className="container">
        <div className="regformf" style={{ marginTop: '100px' }}>
          <form onSubmit={handleSubmit}>
            <p className="logo">Food <b style={{ color: "#06C167" }}>Donate</b></p>
            
            <div className="input">
              <label htmlFor="foodname" className="textlabel">Food Name:</label>
              <input type="text" id="foodname" name="foodname" required value={formData.foodname} onChange={handleChange} />
            </div>

            <div className="radio">
              <label className="textlabel">Meal type:</label>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="meal" id="veg" value="veg" checked={formData.meal === 'veg'} onChange={handleChange} required />
                <label htmlFor="veg" style={{ paddingRight: '40px', marginLeft: '10px' }}>Veg</label>
                <input type="radio" name="meal" id="Non-veg" value="Non-veg" checked={formData.meal === 'Non-veg'} onChange={handleChange} />
                <label htmlFor="Non-veg" style={{ marginLeft: '10px' }}>Non-veg</label>
              </div>
            </div>

            <div className="input">
              <label className="textlabel">Select the Category:</label>
              <div className="image-radio-group" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <input type="radio" id="raw-food" name="category" value="raw-food" checked={formData.category === 'raw-food'} onChange={handleChange} style={{ display: 'none' }} />
                  <label htmlFor="raw-food">
                    <img src="/img/raw-food.png" alt="raw" style={{ width: '90px', borderRadius: '12px', border: formData.category === 'raw-food' ? '3px solid #06C167' : '2px solid #eee', transition: '0.3s', cursor: 'pointer' }} />
                    <p style={{ fontSize: '12px', marginTop: '5px' }}>Raw</p>
                  </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <input type="radio" id="cooked-food" name="category" value="cooked-food" checked={formData.category === 'cooked-food'} onChange={handleChange} style={{ display: 'none' }} />
                  <label htmlFor="cooked-food">
                    <img src="/img/cooked-food.png" alt="cooked" style={{ width: '90px', borderRadius: '12px', border: formData.category === 'cooked-food' ? '3px solid #06C167' : '2px solid #eee', transition: '0.3s', cursor: 'pointer' }} />
                    <p style={{ fontSize: '12px', marginTop: '5px' }}>Cooked</p>
                  </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <input type="radio" id="packed-food" name="category" value="packed-food" checked={formData.category === 'packed-food'} onChange={handleChange} style={{ display: 'none' }} />
                  <label htmlFor="packed-food">
                    <img src="/img/packed-food.png" alt="packed" style={{ width: '90px', borderRadius: '12px', border: formData.category === 'packed-food' ? '3px solid #06C167' : '2px solid #eee', transition: '0.3s', cursor: 'pointer' }} />
                    <p style={{ fontSize: '12px', marginTop: '5px' }}>Packed</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="input">
              <label htmlFor="quantity" className="textlabel">Quantity:(number of person /kg)</label>
              <input type="text" id="quantity" name="quantity" required value={formData.quantity} onChange={handleChange} />
            </div>

            <p style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>Contact Details</p>
            
            <div className="input">
              <label htmlFor="name" className="textlabel">Name:</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="input">
              <label htmlFor="phoneno" className="textlabel">PhoneNo:</label>
              <input type="text" id="phoneno" name="phoneno" maxLength={10} pattern="[0-9]{10}" required value={formData.phoneno} onChange={handleChange} />
            </div>

            <div className="input">
              <label htmlFor="address" className="textlabel">Address Note (Optional):</label>
              <input type="text" id="address" name="address" placeholder="e.g. Near the post office" value={formData.address} onChange={handleChange} />
            </div>

            <div className="location-btn" style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button 
                type="button" 
                onClick={handleLocateMe}
                style={{ background: location ? '#06C167' : '#ff4757', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isLocating ? 'Locating...' : location ? '✓ Location Acquired' : '📍 Mandatory: Locate Me'}
              </button>
              {!location && <p style={{ fontSize: '12px', color: '#ff4757', marginTop: '5px' }}>Delivery requires your precise location</p>}
            </div>

            <div className="btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
