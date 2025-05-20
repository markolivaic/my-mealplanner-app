import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, editRecipe } = useRecipes();
  const { user } = useAuth();

  const recipe = recipes.find(r => r.id === parseInt(id));

  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    category: '',
    calories: '',
    prepTime: '',
    ingredients: '',
    instructions: '',
    image: ''
  });

  useEffect(() => {
    if (recipe && recipe.created_by === user.name) {
      setRecipeData({
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        calories: recipe.calories,
        prepTime: recipe.prepTime,
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join('\n')
          : recipe.ingredients,
        instructions: Array.isArray(recipe.instructions)
          ? recipe.instructions.join('\n')
          : recipe.instructions,
        image: recipe.image
      });
    } else {
      navigate('/my-recipes');
    }
  }, [recipe, user.name, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title: recipeData.title,
      description: recipeData.description,
      category: recipeData.category,
      calories: Number(recipeData.calories),
      prepTime: Number(recipeData.prepTime),
      ingredients: recipeData.ingredients.split('\n'),
      instructions: recipeData.instructions.split('\n'),
      image: recipeData.image
    };

    try {
      await editRecipe(parseInt(id), updatedRecipe, user.name);
      toast.success('Recipe updated and sent for approval!');
      navigate('/my-recipes');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Update failed. Please try again.');
    }
  };

  const handleReset = () => {
    if (recipe) {
      setRecipeData({
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        calories: recipe.calories,
        prepTime: recipe.prepTime,
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join('\n')
          : recipe.ingredients,
        instructions: Array.isArray(recipe.instructions)
          ? recipe.instructions.join('\n')
          : recipe.instructions,
        image: recipe.image
      });
    }
  };

  return (
    <div className="page-title">
      <div className="container">
        <h1>Edit Recipe</h1>
        <p>Make changes to your recipe below</p>
      </div>

      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Recipe Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={recipeData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={recipeData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  value={recipeData.calories}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prepTime">Preparation Time (min)</label>
                <input
                  type="number"
                  id="prepTime"
                  name="prepTime"
                  value={recipeData.prepTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                value={recipeData.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-footer">
              <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
              <button type="submit" className="btn btn-primary">Update Recipe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
