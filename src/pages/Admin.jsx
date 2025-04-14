// pages/Admin.jsx
import { useRecipes } from '../context/RecipeContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { recipes, approveRecipe, rejectRecipe } = useRecipes();
  const [pendingRecipes, setPendingRecipes] = useState(recipes.filter(r => !r.approved));

  const handleApprove = (id) => {
    approveRecipe(id);
    setPendingRecipes(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = (id) => {
    rejectRecipe(id);
    setPendingRecipes(prev => prev.filter(r => r.id !== id));
  };

  return (
    <>
      <div className="page-title">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage recipes and site content</p>
        </div>
      </div>

      <div className="container">
        <section className="admin-section">
          <h2>Pending Recipe Approvals</h2>
          {pendingRecipes.length > 0 ? (
            <div className="admin-grid">
              {pendingRecipes.map(recipe => (
                <div key={recipe.id} className="admin-card">
                  <div className="recipe-image">
                    <img src={recipe.image} alt={recipe.title} />
                    <span className="recipe-tag">{recipe.category}</span>
                  </div>
                  <div className="admin-card-content">
                    <h3>{recipe.title}</h3>
                    <div className="admin-meta">
                      <p>By: {recipe.createdBy}</p>
                      <p>Submitted: Just now</p>
                    </div>
                    <div className="admin-actions">
                      <Link to={`/recipes/${recipe.id}`} className="btn btn-secondary">Preview</Link>
                      <button onClick={() => handleApprove(recipe.id)} className="btn btn-primary">Approve</button>
                      <button onClick={() => handleReject(recipe.id)} className="btn btn-secondary">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No recipes pending approval.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Admin;