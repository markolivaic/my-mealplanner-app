import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  
  // Staticki podaci o receptu, kasnije će biti zamijenjeni API pozivom
  const recipeData = {
    id: id,
    title: 'Grilled Salmon with Herbs',
    description: 'Perfectly grilled salmon fillet with fresh herbs and lemon.',
    image: 'my-mealplanner-app/public/images/pexels-ella-olsson-572949-1640775.png',
    tags: ['Seafood', 'Dinner', 'High-Protein'],
    calories: 450,
    prepTime: 25,
    servings: 2,
    ingredients: [
      '2 salmon fillets (6 oz each)',
      '2 tablespoons olive oil',
      '2 cloves garlic, minced',
      '1 tablespoon fresh dill, chopped',
      '1 tablespoon fresh parsley, chopped',
      '1 lemon, sliced',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat your grill to medium-high heat (about 375°F to 400°F).',
      'In a small bowl, combine olive oil, minced garlic, dill, parsley, salt, and pepper.',
      'Pat the salmon fillets dry with paper towels and place them on a plate.',
      'Brush the herb mixture generously over both sides of the salmon fillets.',
      'Place the salmon fillets skin-side down on the preheated grill.',
      'Cook for 4-5 minutes, then carefully flip and cook for an additional 3-4 minutes or until the salmon flakes easily with a fork.',
      'Remove from grill and squeeze fresh lemon juice over the top.',
      'Serve immediately with lemon slices as garnish.'
    ]
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/recipes" className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back to Recipes
      </Link>
      
      <div className="recipe-detail">
        <div className="recipe-header">
          <img 
            src={recipeData.image} 
            alt={recipeData.title} 
            className="recipe-image" 
          />
          <div className="recipe-tags">
            {recipeData.tags.map((tag, index) => (
              <span key={index} className="recipe-tag">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="recipe-content">
          <h1>{recipeData.title}</h1>
          <p>{recipeData.description}</p>
          
          <div className="recipe-meta">
            <div className="meta-item">
              <span className="meta-icon">🔥</span>
              <span>{recipeData.calories} calories</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{recipeData.prepTime} mins</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">👥</span>
              <span>{recipeData.servings} servings</span>
            </div>
            <div className="meta-item">
              <button className="btn btn-secondary">Add to Meal Plan</button>
            </div>
          </div>
          
          <div className="recipe-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="recipe-section">
            <h3>Instructions</h3>
            <ol className="instructions-list">
              {recipeData.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;