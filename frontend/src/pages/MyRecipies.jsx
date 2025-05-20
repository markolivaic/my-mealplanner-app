import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const MyRecipes = () => {
  const { user } = useAuth();
  const { recipes, fetchMyRecipes, deleteRecipe } = useRecipes();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserRecipes = async () => {
      if (user?.name) {
        await fetchMyRecipes(user.name);
      } else {
        navigate('/login');
      }
    };
    loadUserRecipes();
  }, [user, fetchMyRecipes, navigate]);

  const userRecipes = recipes.filter(recipe => recipe.created_by === user.name);

  const handleDelete = async (id) => {
  await deleteRecipe(id, user.name);
  toast.success('Recipe deleted successfully');
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
                  <p>Added by you</p>
                  <div className="recipe-status">
                    <Badge status={recipe.approved ? 'approved' : 'pending'} />
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
