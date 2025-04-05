import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = ({ formType = 'login' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, would handle authentication here
  };

  const isLogin = formType === 'login';

  return (
    <div className="container auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin ? (
              <div className="form-group checkbox-group">
                <div className="remember-forgot">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div className="forgot-password">
                    <a href="#forgot-password">Forgot Password?</a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-group checkbox-group">
                <div className="checkbox-wrapper terms">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
                  </label>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary submit-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span>Or sign in with</span>
          </div>

          <div className="social-login">
            <button type="button">Google</button>
            <button type="button">Facebook</button>
          </div>

          <div className="form-footer">
            {isLogin ? (
              <p>Don't have an account? <Link to="/register">Register Now</Link></p>
            ) : (
              <p>Already have an account? <Link to="/login">Login</Link></p>
            )}
          </div>
        </div>

        <div className="auth-content">
          <h2>{isLogin ? 'Plan Your Meals with Ease' : 'Discover New Recipes Every Day'}</h2>
          <p>
            {isLogin 
              ? 'Get access to thousands of recipes and create personalized meal plans to meet your health goals.' 
              : 'Join our community of food enthusiasts and access thousands of recipes to make meal planning a breeze.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;