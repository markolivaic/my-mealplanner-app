import { useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  // Staticki podaci o jelima, kasnije će biti zamijenjeni API pozivom
  const [pendingRecipes, setPendingRecipes] = useState([
    {
      id: 7,
      title: 'Homemade Lasagna',
      image: '/public/lovable-uploads/8519731c-0794-4bc3-8014-be929a3a90b1.png',
      submittedBy: 'John Smith',
      submittedOn: '2023-09-15',
      category: 'Dinner'
    },
    {
      id: 8,
      title: 'Green Smoothie Bowl',
      image: '/public/lovable-uploads/20ce8b6a-a0c9-47bc-94fc-d7ff3f26ea30.png',
      submittedBy: 'Emily Johnson',
      submittedOn: '2023-09-18',
      category: 'Breakfast'
    },
    {
      id: 9,
      title: 'Spicy Chicken Curry',
      image: '/public/lovable-uploads/2e60d0f2-4564-4a7a-af0e-b48117cd8b6d.png',
      submittedBy: 'Michael Lee',
      submittedOn: '2023-09-20',
      category: 'Dinner'
    }
  ]);

  const handleApprove = (id) => {
    // Staticno zasad, posli cemo zvaniti API za odobrenje recepta
    setPendingRecipes(pendingRecipes.filter(recipe => recipe.id !== id));
    alert(`Recipe with ID ${id} approved successfully!`);
  };

  const handleReject = (id) => {
    // Staticno zasad, posli cemo zvaniti API za odbijanje recepta
    setPendingRecipes(pendingRecipes.filter(recipe => recipe.id !== id));
    alert(`Recipe with ID ${id} rejected.`);
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
                      <p>By: {recipe.submittedBy}</p>
                      <p>Submitted: {new Date(recipe.submittedOn).toLocaleDateString()}</p>
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

        <section className="admin-section">
          <h2>Site Statistics</h2>
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-value">125</div>
              <div className="stat-label">Total Recipes</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">42</div>
              <div className="stat-label">Registered Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">18</div>
              <div className="stat-label">New Users This Month</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">5.2k</div>
              <div className="stat-label">Monthly Visits</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admin;