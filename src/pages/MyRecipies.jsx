// pages/MyRecipes.jsx
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';

const MyRecipes = () => {
  const { user } = useAuth();
  const { recipes, deleteRecipe } = useRecipes();

  const userRecipes = recipes.filter(recipe => recipe.createdBy === user.name);

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
                  <p>Added by you</p>
                  <div className="recipe-status">
                    <Badge status={recipe.approved ? 'approved' : 'pending'} />
                  </div>
                  <div className="recipe-actions">
                    <Link to={`/recipes/${recipe.id}`} className="btn btn-secondary">View</Link>
                    <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-secondary">Edit</Link>
                    <button onClick={() => deleteRecipe(recipe.id)} className="btn btn-secondary">Delete</button>
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
