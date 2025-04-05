import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';

const MyRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([
    {
      id: 1,
      title: 'Fresh Vegetable Salad',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      date: '2025-06-01',
      status: 'approved',
      category: 'Lunch'
    },
    {
      id: 2,
      title: 'Grilled Salmon with Herbs',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      date: '2025-06-10',
      status: 'approved',
      category: 'Dinner'
    },
    {
      id: 3,
      title: 'Chocolate Chip Cookies',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      date: '2025-09-22',
      status: 'pending',
      category: 'Dessert'
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setUserRecipes(userRecipes.filter(recipe => recipe.id !== id));
    }
  };

  return (
    <>
      <div className="page-title">
        <div className="container">
          <h1>My Recipes</h1>
          <p>Manage your submitted recipes</p>
        </div>
      </div>

      <div className="container">
        <div className="my-recipes-header">
          <Link to="/add-recipe" className="btn btn-primary">Create New Recipe</Link>
        </div>

        {userRecipes.length > 0 ? (
          <div className="recipes-grid">
            {userRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <span className="recipe-tag">{recipe.category}</span>
                </div>
                <div className="recipe-content">
                  <h3>{recipe.title}</h3>
                  <p>Added on {new Date(recipe.date).toLocaleDateString()}</p>
                  <div className="recipe-status">
                    <Badge status={recipe.status} />
                  </div>
                  <div className="recipe-actions">
                    <Link to={`/recipes/${recipe.id}`} className="btn btn-secondary">View</Link>
                    <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-secondary">Edit</Link>
                    <button onClick={() => handleDelete(recipe.id)} className="btn btn-secondary">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't created any recipes yet.</p>
            <Link to="/add-recipe" className="btn btn-primary">Create Your First Recipe</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MyRecipes;