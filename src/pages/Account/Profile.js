import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://teanologyweb.tifpsdku.com/admin/profile');
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profile Page (Under Development)</h1>
      {loading ? (
        <p>Loading profile...</p>
      ) : profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Add more profile details as needed */}
        </div>
      ) : (
        <p>Failed to load profile data.</p>
      )}
    </div>
  );
};

export default Profile;
