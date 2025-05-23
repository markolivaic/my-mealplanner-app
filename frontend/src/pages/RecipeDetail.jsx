import { useParams, Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useEffect, useState } from 'react';

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const localRecipe = recipes.find(r => String(r.id) === id);
    if (localRecipe) {
      setRecipe(localRecipe);
      setLoading(false);
    } else {
      // Fetch from backend
      fetch(`/api/get-recipe.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data?.id) {
            setRecipe(data);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
    }
  }, [id, recipes]);

  if (loading) {
    return <div className="container" style={{ padding: '2rem' }}>Loading recipe...</div>;
  }

  if (notFound || !recipe) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <p>Recipe not found.</p>
        <Link to="/recipes" className="btn btn-secondary">← Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/recipes" className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back to Recipes
      </Link>

      <div className="recipe-detail">
        <div className="recipe-header">
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
              style={{
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '12px',
                objectFit: 'cover',
                margin: '1rem 0',
              }}
            />
          )}
          <div className="recipe-tags">
            {recipe.tags?.map((tag, index) => (
              <span key={index} className="recipe-tag">{tag}</span>
            ))}
            {recipe.category && <span className="recipe-tag">{recipe.category}</span>}
          </div>
        </div>

        <div className="recipe-content">
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>

          <div className="recipe-meta">
            <div className="meta-item">🔥 {recipe.calories} calories</div>
            <div className="meta-item">⏱️ {recipe.prepTime} mins</div>
            {recipe.servings && (
              <div className="meta-item">👥 {recipe.servings} servings</div>
            )}
            {/* Optional button */}
            {/* <div className="meta-item">
              <button className="btn btn-secondary">Add to Meal Plan</button>
            </div> */}
          </div>

          <div className="recipe-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h3>Instructions</h3>
            <ol className="instructions-list">
              {recipe.instructions?.map((step, index) => (
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
