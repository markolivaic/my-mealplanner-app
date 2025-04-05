import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  // Staticki podaci o receptima, kasnije će biti zamijenjeni API pozivom
  const allRecipes = [
    {
      id: 1,
      title: 'Fresh Vegetable Salad',
      description: 'A delightful mix of seasonal vegetables with a zesty dressing.',
      image: 'my-mealplanner-app/public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Vegetarian',
      calories: 320,
      prepTime: 15,
      category: 'Lunch'
    },
    {
      id: 2,
      title: 'Grilled Salmon with Herbs',
      description: 'Perfectly grilled salmon fillet with fresh herbs and lemon.',
      image: 'my-mealplanner-app/public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Seafood',
      calories: 450,
      prepTime: 25,
      category: 'Dinner'
    },
    {
      id: 3,
      title: 'Energizing Quinoa Bowl',
      description: 'Nutrient-rich quinoa with roasted vegetables and tahini sauce.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Vegan',
      calories: 380,
      prepTime: 20,
      category: 'Lunch'
    },
    {
      id: 4,
      title: 'Pasta Primavera',
      description: 'Colorful pasta with fresh spring vegetables and light cream sauce.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Dinner',
      calories: 520,
      prepTime: 35,
      category: 'Dinner'
    },
    {
      id: 5,
      title: 'Avocado Toast with Eggs',
      description: 'Wholesome breakfast with smashed avocado, poached eggs, and microgreens.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Breakfast',
      calories: 350,
      prepTime: 20,
      category: 'Breakfast'
    },
    {
      id: 6,
      title: 'Mixed Berry Smoothie',
      description: 'Refreshing smoothie made with mixed berries, banana, and Greek yogurt.',
      image: 'public/images/pexels-ella-olsson-572949-1640775.png',
      tag: 'Snack',
      calories: 210,
      prepTime: 10,
      category: 'Breakfast'
    }
  ];


  const filteredRecipes = allRecipes
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
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
          
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
          >
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

        <div className="pagination">
          <a href="#" className="page-item active">1</a>
          <a href="#" className="page-item">2</a>
          <a href="#" className="page-item">3</a>
          <a href="#" className="page-item">Next</a>
        </div>
      </div>
    </>
  );
};

export default Recipes;