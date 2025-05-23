import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Meal<span>Planner</span></h1>
        </Link>

        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          {user?.isLoggedIn && (
            <>
              <NavLink to="/add-recipe">Add Recipe</NavLink>
              <NavLink to="/meal-plan">My Meal Plan</NavLink>
              <NavLink to="/my-recipes">My Recipes</NavLink>
              {user.isAdmin && <NavLink to="/admin">Admin Dashboard</NavLink>}
            </>
          )}
        </nav>

        <div className="auth-buttons">
          {user?.isLoggedIn ? (
            <>
              <Link to="/profile" className="user-profile-link">{user.name}</Link>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
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
