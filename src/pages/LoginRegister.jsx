// pages/LoginRegister.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import users from '../data/users';
import { toast } from 'react-toastify';

const LoginRegister = ({ formType = 'login' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false,
  });

  const isLogin = formType === 'login';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const foundUser = users.find(
        user => user.email === formData.email && user.password === formData.password
      );
      if (foundUser) {
        login({
          isLoggedIn: true,
          isAdmin: foundUser.isAdmin,
          name: foundUser.fullName
        });
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        isAdmin: false
      };
      users.push(newUser);
      toast.success('Registration successful! You can now log in.');
      navigate('/login');
    }
  };

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
