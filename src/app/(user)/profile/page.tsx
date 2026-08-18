"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout, updateUser, isLoading } = useAuth();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', gender: '' });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleEditInit = () => {
    if (user) {
      setEditForm({ name: user.name, gender: user.gender });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editForm.name.trim()) {
      updateUser({ name: editForm.name, gender: editForm.gender });
      setIsEditing(false);
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you SURE you want to delete your account? This action cannot be undone.")) {
      if (user) {
        try {
          const storageKey = user.role === 'delivery' ? 'fd_delivery_users' : 'fd_users';
          const allUsers = JSON.parse(localStorage.getItem(storageKey) || '[]');
          const filtered = allUsers.filter((u: any) => u.email !== user.email);
          localStorage.setItem(storageKey, JSON.stringify(filtered));
        } catch {}
      }
      handleLogout();
    }
  };

  // Load donations from localStorage cache
  const donations = React.useMemo(() => {
    try {
      const all = JSON.parse(localStorage.getItem('fd_donations') || '[]');
      return all.filter((d: any) => d.email === user?.email);
    } catch {
      return [];
    }
  }, [user]);

  if (isLoading) {
    return <main className="profile-container"><p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p></main>;
  }

  if (!user) {
    return (
      <main className="profile-container">
        <div className="profilebox" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '20px', marginBottom: '20px' }}>You are not logged in.</p>
          <Link href="/" className="logout-btn">Login Page</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-container">
      <div className="profile">
        <div className="profilebox">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="headingline" style={{ fontSize: '30px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <img src="/img/user.png" alt="User" style={{ width: '40px', paddingRight: '10px' }} />
              Profile
            </p>
            <div>
               {!isEditing && <button onClick={handleEditInit} style={{ marginRight: '10px', background: '#f0ad4e', border: 'none', padding: '8px 15px', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>}
               <button onClick={handleDeleteAccount} style={{ background: '#d9534f', border: 'none', padding: '8px 15px', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
          
          <div className="info" style={{ paddingLeft: '10px' }}>
            {isEditing ? (
              <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <div>
                   <label>Name: </label>
                   <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}/>
                 </div>
                 <div>
                   <label>Gender: </label>
                   <select value={editForm.gender} onChange={e => setEditForm({...editForm, gender: e.target.value})} style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                   </select>
                 </div>
                 <div style={{ marginTop: '10px' }}>
                   <button onClick={handleSaveEdit} style={{ background: '#06C167', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Save Changes</button>
                   <button onClick={() => setIsEditing(false)} style={{ background: '#ccc', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                 </div>
              </div>
            ) : (
              <>
                <p>Name: <strong>{user.name}</strong></p><br />
                <p>Email: <strong>{user.email}</strong></p><br />
                <p>Role: <strong>{user.role}</strong></p><br />
                <p>Gender: <strong>{user.gender}</strong></p><br />
              </>
            )}
          </div>
          <br /><br />
          <hr />
          <br />

          <p className="heading">Your donations</p>
          {donations.length === 0 ? (
            <p style={{ padding: '20px', color: '#777' }}>No donations yet. <Link href="/donate" style={{ color: '#06C167' }}>Donate food</Link></p>
          ) : (
            <div className="table-container">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((d: any, i: number) => (
                      <tr key={i}>
                        <td>{d.foodname}</td>
                        <td>{d.meal}</td>
                        <td>{d.category}</td>
                        <td>{d.quantity}</td>
                        <td>{d.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
