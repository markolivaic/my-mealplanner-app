import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  // State to manage user authentication status
  const [user, setUser] = useState({
    isLoggedIn: true,
    isAdmin: true,
    name: 'Jane Doe'
  });

  const handleLogout = () => {
    // Logic to handle user logout
    setUser({
      isLoggedIn: false,
      isAdmin: false,
      name: ''
    });
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Meal<span>Planner</span></h1>
        </Link>
        
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          {user.isLoggedIn && (
            <>
              <NavLink to="/add-recipe">Add Recipe</NavLink>
              <NavLink to="/meal-plan">My Meal Plan</NavLink>
              <NavLink to="/my-recipes">My Recipes</NavLink>
              {user.isAdmin && (
                <NavLink to="/admin">Admin Dashboard</NavLink>
              )}
            </>
          )}
        </nav>
        
        <div className="auth-buttons">
          {user.isLoggedIn ? (
            <>
              <Link to="/profile" className="user-profile-link">
                {user.name}
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;