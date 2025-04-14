// pages/Recipes.jsx
import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

const Recipes = () => {
  const { recipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  const filteredRecipes = recipes
    .filter(recipe => recipe.approved)
    .filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category ? recipe.category === category : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'newest') return b.id - a.id;
      if (sort === 'calories-asc') return a.calories - b.calories;
      if (sort === 'calories-desc') return b.calories - a.calories;
      if (sort === 'time-asc') return a.prepTime - b.prepTime;
      if (sort === 'time-desc') return b.prepTime - a.prepTime;
      return 0;
    });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="page-title">
        <div className="container">
          <h1>Explore Recipes</h1>
          <p>Discover delicious meals for your weekly meal plan</p>
        </div>
      </div>

      <div className="container">
        <form className="search-filters" onSubmit={handleSearch}>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search recipes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="calories-asc">Calories (Low to High)</option>
            <option value="calories-desc">Calories (High to Low)</option>
            <option value="time-asc">Time (Shortest to Longest)</option>
            <option value="time-desc">Time (Longest to Shortest)</option>
          </select>
        </form>

        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <p>No recipes found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Recipes;