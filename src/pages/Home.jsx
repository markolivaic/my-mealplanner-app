import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  // Staticki podaci o jelima, kasnije će biti zamijenjeni API pozivom
  const featuredRecipes = [
    {
      id: 1,
      title: 'Fresh Vegetable Salad',
      description: 'A delightful mix of seasonal vegetables with a zesty dressing.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Vegetarian',
      calories: 320,
      prepTime: 15
    },
    {
      id: 2,
      title: 'Grilled Salmon with Herbs',
      description: 'Perfectly grilled salmon fillet with fresh herbs and lemon.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Seafood',
      calories: 450,
      prepTime: 25
    },
    {
      id: 3,
      title: 'Energizing Quinoa Bowl',
      description: 'Nutrient-rich quinoa with roasted vegetables and tahini sauce.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Vegan',
      calories: 380,
      prepTime: 20
    }
  ];

  // Features
  const features = [
    {
      icon: '🔍',
      title: 'Discover Recipes',
      description: 'Find recipes that match your dietary requirements and preferences.'
    },
    {
      icon: '📅',
      title: 'Plan Your Week',
      description: 'Organize your meals for the week, saving time and reducing stress.'
    },
    {
      icon: '🛒',
      title: 'Shopping Lists',
      description: 'Automatically generate shopping lists based on your meal plan.'
    },
    {
      icon: '❤️',
      title: 'Save Favorites',
      description: 'Bookmark your favorite recipes to easily find them later.'
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1>Plan Your Meals, Simplify Your Life</h1>
            <p>Discover delicious recipes, create meal plans, and organize your cooking routine effortlessly.</p>
            <div className="hero-buttons">
              <Link to="/meal-plan" className="btn btn-primary btn-large">Start Planning</Link>
              <Link to="/recipes" className="btn btn-secondary btn-large">Browse Recipes</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="public\images\pexels-ella-olsson-572949-1640775.png" alt="Meal Planning" />
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Featured Recipes</h2>
          <p className="subtitle">Try these popular dishes selected for you</p>
          
          <div className="recipes-grid">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          <Link to="/recipes" className="view-all-link">View All Recipes →</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Use MealPlanner?</h2>
            <p>Simple tools to make meal planning effortless</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to simplify your meal planning?</h2>
          <p>Join MealPlanner today and make cooking a breeze.</p>
          <Link to="/register" className="btn btn-large">Sign Up Free</Link>
        </div>
      </section>
    </>
  );
};

export default Home;