import { useRecipes } from '../context/RecipeContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
  const { recipes, fetchAllRecipes, approveRecipe, rejectRecipe } = useRecipes();
  const [pendingRecipes, setPendingRecipes] = useState([]);

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    const pending = recipes.filter(r => !r.approved);
    setPendingRecipes(pending);
  }, [recipes]);

  const handleApprove = async (id) => {
  try {
    await approveRecipe(id);
    await fetchAllRecipes();
    toast.success('Recipe approved.');
  } catch (err) {
    console.error('Approval error:', err);
    toast.error('Failed to approve recipe.');
  }
};

const handleReject = async (id) => {
  try {
    await rejectRecipe(id);
    await fetchAllRecipes();
    toast.success('Recipe rejected and deleted.');
  } catch (err) {
    console.error('Rejection error:', err);
    toast.error('Failed to reject recipe.');
  }
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
                      <p>By: {recipe.created_by}</p>
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
