// pages/MealPlan.jsx
import { useEffect, useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const getInitialPlan = () => {
  const stored = localStorage.getItem('mealPlan');
  if (stored) return JSON.parse(stored);
  return Array(7).fill(null).map(() => ({ breakfast: null, lunch: null, dinner: null, dailyTotal: 0 }));
};

const MealPlan = () => {
  const { recipes } = useRecipes();
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState(getInitialPlan);
  const [currentWeek, setCurrentWeek] = useState('June 12 - June 18, 2025');
  const [selecting, setSelecting] = useState({ dayIndex: null, mealType: null });

  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const previousWeek = () => setCurrentWeek('June 5 - June 11, 2025');
  const nextWeek = () => setCurrentWeek('June 19 - June 25, 2025');

  const updateTotals = (plan, dayIndex) => {
    plan[dayIndex].dailyTotal = ['breakfast', 'lunch', 'dinner'].reduce((sum, type) => {
      return sum + (plan[dayIndex][type]?.calories || 0);
    }, 0);
  };

  const handleSelectRecipe = (recipe) => {
    const { dayIndex, mealType } = selecting;
    const updated = mealPlan.map(day => ({ ...day }));
    updated[dayIndex][mealType] = {
      name: recipe.title,
      image: recipe.image,
      calories: recipe.calories
    };
    updateTotals(updated, dayIndex);
    setMealPlan(updated);
    setSelecting({ dayIndex: null, mealType: null });
  };

  const handleRemoveMeal = (dayIndex, mealType) => {
    const updated = mealPlan.map(day => ({ ...day }));
    updated[dayIndex][mealType] = null;
    updateTotals(updated, dayIndex);
    setMealPlan(updated);
  };

  const featured = recipes.filter(r => r.approved);
  const myRecipes = user ? recipes.filter(r => r.createdBy === user.name) : [];

  const weeklyStats = {
    totalCalories: mealPlan.reduce((sum, day) => sum + day.dailyTotal, 0),
    dailyAverage: Math.round(mealPlan.reduce((sum, day) => sum + day.dailyTotal, 0) / 7),
    mealsPlanned: mealPlan.reduce((count, day) => {
      return count + (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.dinner ? 1 : 0);
    }, 0),
    slotsAvailable: 21 - mealPlan.reduce((count, day) => {
      return count + (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.dinner ? 1 : 0);
    }, 0)
  };

  return (
    <div className="meal-plan">
      <div className="page-title">
        <div className="container">
          <h1>My Weekly Meal Plan</h1>
          <p>Plan your meals for the week and keep track of your nutrition</p>
        </div>
      </div>

      <div className="container">
        <div className="week-header">
          <div className="week-navigation">
            <button className="btn btn-secondary" onClick={previousWeek}>Previous Week</button>
            <span className="current-week">{currentWeek}</span>
            <button className="btn btn-secondary" onClick={nextWeek}>Next Week</button>
          </div>
          <div className="week-actions">
            <button className="btn btn-secondary">Print Plan</button>
            <button className="btn btn-primary">Share Plan</button>
          </div>
        </div>

        <div className="week-grid">
          <div className="grid-header time-label">Meals</div>
          {weekdays.map((day, index) => (
            <div key={index} className="grid-header">{day}</div>
          ))}

          {['breakfast', 'lunch', 'dinner'].map(mealType => (
            <>
              <div className="grid-header time-label">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</div>
              {mealPlan.map((day, index) => (
                <div key={`${mealType}-${index}`} className="meal-cell">
                  {day[mealType] ? (
                    <div className="meal-content">
                      <img src={day[mealType].image} alt={day[mealType].name} className="meal-image" />
                      <div className="meal-name">{day[mealType].name}</div>
                      <div className="meal-calories">{day[mealType].calories} cal</div>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveMeal(index, mealType)} style={{ marginTop: '0.5rem' }}>Remove</button>
                    </div>
                  ) : (
                    <div className="add-meal" onClick={() => setSelecting({ dayIndex: index, mealType })}>
                      <span className="add-icon">+</span>
                      <span>Add {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}

          <div className="grid-header time-label">Daily Total</div>
          {mealPlan.map((day, index) => (
            <div key={`total-${index}`} className="grid-header daily-total">
              {day.dailyTotal} cal
            </div>
          ))}
        </div>

        {selecting.dayIndex !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Select a recipe</h3>

            <h4>Featured Recipes</h4>
            <div className="modal-section">
              {featured.map((r, i) => (
                <button key={`f-${i}`} onClick={() => handleSelectRecipe(r)} className="recipe-option">
                  <img src={r.image} alt={r.title} className="thumb" />
                  <span>{r.title}</span>
                </button>
              ))}
            </div>

            <h4>My Recipes</h4>
            <div className="modal-section">
              {myRecipes.map((r, i) => (
                <button key={`m-${i}`} onClick={() => handleSelectRecipe(r)} className="recipe-option">
                  <img src={r.image} alt={r.title} className="thumb" />
                  <span>{r.title}</span>
                </button>
              ))}
            </div>

            <button onClick={() => setSelecting({ dayIndex: null, mealType: null })} className="btn btn-secondary btn-sm">
              Cancel
            </button>
          </div>
        </div>
        )}

        <div className="meal-summary">
          <div className="summary-card">
            <h3>Weekly Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{weeklyStats.totalCalories}</div>
                <div className="stat-label">Total Calories</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{weeklyStats.dailyAverage}</div>
                <div className="stat-label">Daily Average</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{weeklyStats.mealsPlanned}</div>
                <div className="stat-label">Meals Planned</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{weeklyStats.slotsAvailable}</div>
                <div className="stat-label">Slots Available</div>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <h3>
              Shopping List
              <button className="btn btn-secondary btn-sm">Generate</button>
            </h3>
            <p>Generate a shopping list based on your meal plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
