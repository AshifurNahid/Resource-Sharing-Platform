'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/profile.module.css';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user profile');

        const data = await response.json();
        setUser(data);
        setUsername(data.username);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchUserProfile();
  }, [userId]);

  const handleUpdate = async () => {
    if (!username || !password) {
      setError('Username and password are required for update');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      setSuccess('Profile updated successfully!');
      setUpdateMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <Image
            src="/Ashifur_Nahid.png"
            alt="User Profile"
            width={130}
            height={120}
            className={styles.profileImage}
          />
          <h2 className={styles.username}>{user.username}</h2>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.joined}>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-outline-primary me-2">View Posts</button>
          <button className="btn btn-outline-secondary">Friends List</button>
        </div>

        <hr className={styles.divider} />

        {!updateMode ? (
          <button className="btn btn-primary" onClick={() => setUpdateMode(true)}>
            Update Profile
          </button>
        ) : (
          <div className={styles.updateForm}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="New Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-success w-100 mb-2"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              className="btn btn-outline-danger w-100"
              onClick={() => setUpdateMode(false)}
            >
              Cancel
            </button>
          </div>
        )}

        {success && <div className="alert alert-success mt-3">{success}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}
