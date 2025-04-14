// context/RecipeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import initialRecipes from '../data/recipes';

const RecipeContext = createContext();

const getStoredRecipes = () => {
  const saved = localStorage.getItem('recipes');
  return saved ? JSON.parse(saved) : initialRecipes;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(getStoredRecipes());

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: recipes.length ? recipes[recipes.length - 1].id + 1 : 1,
      approved: false
    };
    setRecipes(prev => [...prev, newRecipe]);
  };

  const editRecipe = (id, updatedData) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updatedData, approved: false } : r));
  };

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  const approveRecipe = (id) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
  };

  const rejectRecipe = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, editRecipe, deleteRecipe, approveRecipe, rejectRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);
