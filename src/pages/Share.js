import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLink, FaImage, FaCheckCircle, FaLock, FaCopy, FaCheck } from 'react-icons/fa';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from 'react-share';
import '../styles/Share.css';

function Share() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    facebook: false,
    instagram: false,
    twitter: false
  });

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check login status
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleConnect = (platform) => {
    // Simulate platform connection
    setConnectedPlatforms({
      ...connectedPlatforms,
      [platform]: !connectedPlatforms[platform]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const copyPostToClipboard = () => {
    const text = `${postData.title}

    ${postData.description}

    ${postData.imageUrl ? `📷 ${postData.imageUrl}` : ''}
    ${postData.link ? `🔗 ${postData.link}` : ''}

    #TravelCompanion #Travel`;

        navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        });
    };
    
  const handleShare = (platform) => {
    if (!connectedPlatforms[platform]) {
      alert(`Please connect to ${platform} first!`);
      return;
    }

    if (!postData.title || !postData.description) {
      alert('Please fill in at least the title and description!');
      return;
    }

    // Simulate successful sharing
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const shareUrl = postData.link || 'https://travelcompanion.com';
  const shareTitle = postData.title || 'Check out my travel adventure!';

  if (!isLoggedIn) {
    return (
      <div className="share-page">
        <div className="container">
          <div className="login-required">
            <FaLock className="lock-icon" />
            <h2>Login Required</h2>
            <p>Please login to share your travel posts</p>
            <button className="btn-primary" onClick={() => navigate('/profile')}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="share-page">
      <div className="container">
        <div className="page-header">
          <h1>Share Your Journey</h1>
          <p>Connect your social media accounts and share your travel experiences</p>
        </div>

        {showSuccess && (
          <div className="success-message">
            <FaCheckCircle /> Post shared successfully!
          </div>
        )}

        <div className="share-content">
          {/* Platform Connection Section */}
          <div className="platforms-section">
            <h2>Connect Social Media</h2>
            <p className="section-description">
              Connect your social media accounts to share your travel posts
            </p>

            <div className="platforms-grid">
              <div className="platform-card">
                <div className="platform-header">
                  <FaFacebook className="platform-icon facebook" />
                  <h3>Facebook</h3>
                </div>
                <p>Share your adventures with friends and family on Facebook</p>
                <button 
                  className={`btn-connect ${connectedPlatforms.facebook ? 'connected' : ''}`}
                  onClick={() => handleConnect('facebook')}
                >
                  {connectedPlatforms.facebook ? (
                    <>
                      <FaCheckCircle /> Connected
                    </>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>

              <div className="platform-card">
                <div className="platform-header">
                  <FaInstagram className="platform-icon instagram" />
                  <h3>Instagram</h3>
                </div>
                <p>Share stunning travel photos and stories on Instagram</p>
                <button 
                  className={`btn-connect ${connectedPlatforms.instagram ? 'connected' : ''}`}
                  onClick={() => handleConnect('instagram')}
                >
                  {connectedPlatforms.instagram ? (
                    <>
                      <FaCheckCircle /> Connected
                    </>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>

              <div className="platform-card">
                <div className="platform-header">
                  <FaTwitter className="platform-icon twitter" />
                  <h3>Twitter (X)</h3>
                </div>
                <p>Tweet about your travel experiences and discoveries</p>
                <button 
                  className={`btn-connect ${connectedPlatforms.twitter ? 'connected' : ''}`}
                  onClick={() => handleConnect('twitter')}
                >
                  {connectedPlatforms.twitter ? (
                    <>
                      <FaCheckCircle /> Connected
                    </>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Create Post Section */}
          <div className="create-post-section">
            <h2>Create a Post</h2>
            <p className="section-description">
              Share your travel moments with your followers
            </p>

            <form className="post-form">
              <div className="form-group">
                <label htmlFor="title">Post Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Amazing day in Paris!"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={postData.description}
                  onChange={handleInputChange}
                  placeholder="Share your travel experience..."
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">
                  <FaImage /> Image URL (Optional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={postData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="link">
                  <FaLink /> Link (Optional)
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={postData.link}
                  onChange={handleInputChange}
                  placeholder="https://your-blog.com"
                />
              </div>
            </form>

            {/* Post Preview */}
            {(postData.title || postData.description) && (
              <div className="post-preview">
                <h3>Post Preview</h3>
                <div className="preview-card">
                  {postData.imageUrl && (
                    <img 
                      src={postData.imageUrl} 
                      alt="Preview" 
                      className="preview-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  {postData.title && <h4>{postData.title}</h4>}
                  {postData.description && <p>{postData.description}</p>}
                  {postData.link && (
                    <a href={postData.link} target="_blank" rel="noopener noreferrer">
                      {postData.link}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="share-buttons">
              <h3>Share To:</h3>
              
              <button 
                className="btn-copy-post"
                onClick={copyPostToClipboard}
                disabled={!postData.title || !postData.description}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Post Content'}</span>
              </button>

              <div className="share-divider">
                <span>Or share directly</span>
              </div>

              <div className="share-buttons-grid">
                <div className="share-button-wrapper">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    hashtag="#TravelCompanion"
                    disabled={!connectedPlatforms.facebook}
                  >
                    <button 
                      className={`btn-share facebook ${!connectedPlatforms.facebook ? 'disabled' : ''}`}
                      onClick={(e) => {
                        if (!connectedPlatforms.facebook) {
                          e.preventDefault();
                          handleShare('facebook');
                        }
                      }}
                    >
                      <FacebookIcon size={32} round />
                      <span>Share on Facebook</span>
                    </button>
                  </FacebookShareButton>
                </div>

                <button 
                  className={`btn-share instagram ${!connectedPlatforms.instagram ? 'disabled' : ''}`}
                  onClick={() => handleShare('instagram')}
                >
                  <FaInstagram size={32} />
                  <span>Share on Instagram</span>
                </button>

                <div className="share-button-wrapper">
                  <TwitterShareButton
                    url={shareUrl}
                    title={shareTitle}
                    hashtags={['TravelCompanion', 'Travel']}
                    disabled={!connectedPlatforms.twitter}
                  >
                    <button 
                      className={`btn-share twitter ${!connectedPlatforms.twitter ? 'disabled' : ''}`}
                      onClick={(e) => {
                        if (!connectedPlatforms.twitter) {
                          e.preventDefault();
                          handleShare('twitter');
                        }
                      }}
                    >
                      <TwitterIcon size={32} round />
                      <span>Share on Twitter</span>
                    </button>
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;