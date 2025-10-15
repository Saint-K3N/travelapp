import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import '../styles/Profile.css';

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'password123',
    profilePic: 'https://via.placeholder.com/150'
  });
  const [editForm, setEditForm] = useState({ ...profile });
  const [previewImage, setPreviewImage] = useState(profile.profilePic);
  const [loading, setLoading] = useState(true);

  // Hardcoded credentials
  const validCredentials = {
    email: 'user@travel.com',
    password: 'travel123'
  };

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setEditForm(parsedProfile);
      setPreviewImage(parsedProfile.profilePic);
    }
    
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    
    setLoading(false);
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginForm.email === validCredentials.email && 
        loginForm.password === validCredentials.password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Invalid credentials! Use:\nEmail: user@travel.com\nPassword: travel123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setEditForm({ ...editForm, profilePic: value });
    setPreviewImage(value || 'https://via.placeholder.com/150');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editForm);
    localStorage.setItem('userProfile', JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    setPreviewImage(profile.profilePic);
    setIsEditing(false);
  };

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="profile">
        <div className="container">
          <div className="login-container">
            <div className="login-box">
              <FaUser className="login-icon" />
              <h2>Welcome Back!</h2>
              <p>Please login to access your profile</p>
              
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="user@travel.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock /> Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="travel123"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary btn-full">
                  <FaSignInAlt /> Login
                </button>
              </form>

              <div className="credentials-hint">
                <p><strong>Demo Credentials:</strong></p>
                <p>Email: user@travel.com</p>
                <p>Password: travel123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="page-header">
          <h1>My Profile</h1>
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="profile-content-single">
          <div className="profile-card">
            <div className="profile-picture-section">
              <img 
                src={previewImage} 
                alt="Profile" 
                className="profile-picture"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              {!isEditing && (
                <button 
                  className="btn-edit-profile"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="profile-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <FaUser /> Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profilePic">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    id="profilePic"
                    name="profilePic"
                    value={editForm.profilePic}
                    onChange={handleImageChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock /> Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    <FaSave /> Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={handleCancel}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <FaUser className="info-icon" />
                  <div>
                    <label>Username</label>
                    <p>{profile.username}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <label>Email</label>
                    <p>{profile.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FaLock className="info-icon" />
                  <div>
                    <label>Password</label>
                    <p>••••••••</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;