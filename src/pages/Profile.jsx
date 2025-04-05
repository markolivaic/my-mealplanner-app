import { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {

  // Staticki podaci o korisniku, kasnije će biti zamijenjeni API pozivom
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    image: 'public/images/pexels-ella-olsson-572949-1640775.png',
    isAdmin: true
  });

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <div className="page-title">
        <div className="container">
          <h1>My Profile</h1>
          <p>View and update your profile information</p>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <button 
            className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`btn ${activeTab === 'preferences' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          {user.isAdmin && (
            <Link to="/admin" className="btn btn-secondary">
              Go to Admin Dashboard
            </Link>
          )}
        </div>

        {activeTab === 'profile' && (
          <div className="form-container">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <img 
                src={user.image} 
                alt={user.name} 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ marginLeft: '1.5rem' }}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
                  Change Photo
                </button>
              </div>
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  defaultValue={user.name} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  defaultValue={user.email} 
                />
              </div>

              <div className="form-section">
                <h3>Change Password</h3>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    name="currentPassword" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword"
                  />
                </div>
              </div>

              <div className="form-footer">
                <button type="button" className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="form-container">
            <h2>Account Preferences</h2>
            <form>
              <div className="form-group">
                <label>Email Notifications</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input type="checkbox" id="newsletter" defaultChecked />
                    <label htmlFor="newsletter">Weekly newsletter</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="recipeUpdates" defaultChecked />
                    <label htmlFor="recipeUpdates">Recipe updates</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="mealReminders" />
                    <label htmlFor="mealReminders">Meal plan reminders</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Dietary Preferences</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input type="checkbox" id="vegetarian" />
                    <label htmlFor="vegetarian">Vegetarian</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="vegan" />
                    <label htmlFor="vegan">Vegan</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="glutenFree" />
                    <label htmlFor="glutenFree">Gluten Free</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="dairyFree" />
                    <label htmlFor="dairyFree">Dairy Free</label>
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <button type="button" className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Preferences</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;