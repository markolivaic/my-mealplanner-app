import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { fetchMyRecipes } = useRecipes();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipeData,
      calories: Number(recipeData.calories),
      prepTime: Number(recipeData.prepTime),
      ingredients: recipeData.ingredients.split('\n'),
      instructions: recipeData.instructions.split('\n'),
      created_by: currentUser?.name || 'Guest'
    };

    try {
      const res = await fetch('/api/add-recipe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      });

      const data = await res.json();

      if (res.ok) {
        // Nakon dodavanja, dohvaćamo ponovno recepte korisnika
        await fetchMyRecipes(currentUser?.name);
        alert('Recipe submitted successfully!');
        navigate('/my-recipes');
      } else {
        alert('Failed to submit recipe: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Submission failed. Please check your connection or try again later.');
    }
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
                placeholder="Enter ingredients (one per line)"
                required
              />
              <span className="help-text">List each ingredient on a new line</span>
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Cooking Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleChange}
                placeholder="Step-by-step instructions"
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
