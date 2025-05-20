import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h3>Planner</h3>
          <p>Your personal meal planning assistant</p>
        </div>
        
        <div className="footer-section">
          <h3>Navigation</h3>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/add-recipe">Add Recipe</Link>
            <Link to="/meal-plan">My Meal Plan</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Support</h3>
          <div className="nav-links">
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest"></i></a>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <div className="container">
          <p>© {new Date().getFullYear()} MealPlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;