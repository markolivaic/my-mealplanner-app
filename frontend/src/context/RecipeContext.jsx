import { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchAllRecipes = async () => {
    try {
      const res = await fetch('/api/get-recipes.php');
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error('Fetch all recipes failed:', err);
    }
  };

  const fetchMyRecipes = async (userName) => {
    try {
      const res = await fetch('/api/get-my-recipes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ created_by: userName })
      });
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error('Fetch my recipes failed:', err);
    }
  };

  const addRecipe = async (recipe) => {
    try {
      const res = await fetch('/api/add-recipe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      const data = await res.json();
      if (res.ok) {
        setRecipes(prev => [...prev, data]);
      } else {
        console.error('Add recipe failed:', data.error);
      }
    } catch (err) {
      console.error('Add recipe error:', err);
    }
  };

  const editRecipe = async (id, updatedData, userName) => {
  try {
    const res = await fetch('/api/edit-recipe.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updatedData })
    });

    const data = await res.json();

    if (res.ok) {
      await fetchMyRecipes(userName);
    } else {
      console.error('Edit failed:', data.error);
    }
  } catch (err) {
    console.error('Edit recipe failed:', err);
  }
};

const deleteRecipe = async (id, userName) => {
  try {
    const res = await fetch('/api/delete-recipe.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const data = await res.json();

    if (res.ok) {
      await fetchMyRecipes(userName);
    } else {
      console.error('Delete failed:', data.error);
    }
  } catch (err) {
    console.error('Delete recipe failed:', err);
  }
};


  const approveRecipe = async (id) => {
    try {
      await fetch('/api/approve-recipe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  const rejectRecipe = async (id) => {
    try {
      await fetch('/api/reject-recipe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, fetchAllRecipes, fetchMyRecipes, addRecipe, editRecipe, deleteRecipe, approveRecipe, rejectRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);
