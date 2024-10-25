import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/userprofile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [auctionItems, setAuctionItems] = useState([]);
  const [bids, setBids] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Function to get token from localStorage
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken();
      if (!token) {
        console.error('No token found, please login.');
        return;
      }
    
      try {
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.username,
          email: response.data.email,
          password: '', // Do not pre-populate password
        });
      } catch (error) {
        if (error.response) {
          console.error('Error fetching user data:', error.response.data);
        } else if (error.request) {
          console.error('No response from the server:', error.request);
        } else {
          console.error('Error during request setup:', error.message);
        }
      }
    };

    const fetchUserItemsAndBids = async () => {
      const token = getToken();
      if (!token) {
        console.error('No token found, please login.');
        return;
      }

      try {
        const itemsResponse = await axios.get('http://localhost:3001/api/user/auctionitems', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuctionItems(itemsResponse.data);

        const bidsResponse = await axios.get('http://localhost:3001/api/user/bids', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBids(bidsResponse.data);
      } catch (error) {
        console.error('Error fetching auction items and bids:', error);
      }
    };

    fetchUserData();
    fetchUserItemsAndBids();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    const token = getToken();
    if (!token) {
      console.error('No token found, please login.');
      return;
    }

    try {
      await axios.put('/api/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.heading}>User Profile</h1>
      
      {user ? (
        <div>
          {!isEditing ? (
            <div className={styles.profileInfo}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button 
                className={styles.editButton} 
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className={styles.profileForm}>
              <input
                className={styles.inputField}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                className={styles.inputField}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                className={styles.inputField}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <button 
                className={styles.saveButton} 
                onClick={handleUpdateProfile}
              >
                Save
              </button>
              <button 
                className={styles.cancelButton} 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}

          <h2 className={styles.subHeading}>Your Auction Items</h2>
          {auctionItems.length > 0 ? (
            <ul className={styles.itemsList}>
              {auctionItems.map((item) => (
                <li key={item.id} className={styles.listItem}>
                  {item.name} - Current Bid: ${item.currentBid}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noItems}>No auction items found.</p>
          )}

          <h2 className={styles.subHeading}>Your Bids</h2>
          {bids.length > 0 ? (
            <ul className={styles.itemsList}>
              {bids.map((bid) => (
                <li key={bid.id} className={styles.listItem}>
                  Bid on {bid.itemName}: ${bid.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noItems}>No bids found.</p>
          )}
        </div>
      ) : (
        <p className={styles.loadingText}>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
