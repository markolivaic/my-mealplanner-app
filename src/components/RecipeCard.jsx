import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const { id, title, description, image, tag, calories, prepTime } = recipe;
  
  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img src={image} alt={title} />
        {tag && <span className="recipe-tag">{tag}</span>}
      </div>
      <div className="recipe-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-icon">🔥</span>
            <span>{calories} calories</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span>{prepTime} mins</span>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/recipes/${id}`} className="btn btn-primary">View Recipe</Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;