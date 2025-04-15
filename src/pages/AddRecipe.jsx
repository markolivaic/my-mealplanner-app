import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const { user: currentUser } = useAuth();

  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    category: '',
    calories: '',
    prepTime: '',
    ingredients: '',
    instructions: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipeData,
      calories: Number(recipeData.calories),
      prepTime: Number(recipeData.prepTime),
      ingredients: recipeData.ingredients.split('\n'),
      instructions: recipeData.instructions.split('\n'),
      createdBy: currentUser?.name || 'Guest',
      status: 'pending'
    };

    addRecipe(newRecipe);
    alert('Recipe submitted successfully!');
    navigate('/my-recipes');
  };

  const handleReset = () => {
    setRecipeData({
      title: '',
      description: '',
      category: '',
      calories: '',
      prepTime: '',
      ingredients: '',
      instructions: '',
      image: '',
    });
  };

  return (
    <>
      <div className="page-title">
        <div className="container">
          <h1>Add a New Recipe</h1>
          <p>Share your favorite recipe with our community</p>
        </div>
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
                placeholder="Enter recipe title"
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
                placeholder="Brief description of your recipe"
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
                  placeholder="Enter calories"
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
                  placeholder="Prep time"
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
                placeholder="Enter ingredients (one per line)"
                required
              />
              <span className="help-text">List each ingredient on a new line (e.g., 1 cup flour)</span>
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Cooking Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleChange}
                placeholder="Step-by-step cooking instructions"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Recipe Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="help-text">Recommended size: 800x600 pixels. Max size: 5MB</span>
            </div>

            <div className="form-footer">
              <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
              <button type="submit" className="btn btn-primary">Submit Recipe</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
