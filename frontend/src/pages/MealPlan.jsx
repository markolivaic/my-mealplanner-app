import { useEffect, useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const getWeekRangeString = (date = new Date()) => {
  const day = date.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${monday.toLocaleDateString('en-US', options)} - ${sunday.toLocaleDateString('en-US', options)}`;
};

const createEmptyPlan = () =>
  Array(7).fill(null).map(() => ({
    breakfast: null,
    lunch: null,
    dinner: null,
    snack: null,
    dessert: null,
    dailyTotal: 0
  }));

const MealPlan = () => {
  const { recipes } = useRecipes();
  const { user } = useAuth();

  const [currentWeek, setCurrentWeek] = useState('');
  const [mealPlan, setMealPlan] = useState([]);
  const [selecting, setSelecting] = useState({ dayIndex: null, mealType: null });
  const [shoppingList, setShoppingList] = useState([]);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'];

  useEffect(() => {
    if (!currentWeek) {
      setCurrentWeek(getWeekRangeString());
    }
  }, [currentWeek]);

  // Fetch from backend
  useEffect(() => {
    const fetchPlan = async () => {
      if (!user?.name || !currentWeek) return;
      try {
        const res = await fetch(`/api/get-user-plan.php?user=${encodeURIComponent(user.name)}&week=${encodeURIComponent(currentWeek)}`);
        const data = await res.json();
        setMealPlan(Array.isArray(data) && data.length === 7 ? data : createEmptyPlan());
      } catch (err) {
        console.error('Failed to fetch user plan:', err);
        setMealPlan(createEmptyPlan());
      }
    };
    fetchPlan();
  }, [user, currentWeek]);

  // Save to backend
  useEffect(() => {
    const savePlan = async () => {
      if (!user?.name || !currentWeek) return;
      try {
        await fetch('/api/save-user-plan.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: user.name,
            week: currentWeek,
            plan: mealPlan
          })
        });
      } catch (err) {
        console.error('Failed to save meal plan:', err);
      }
    };
    savePlan();
  }, [mealPlan, user, currentWeek]);

  const changeWeekBy = (daysOffset) => {
    const currentStart = new Date(currentWeek.split(' - ')[0]);
    const newStart = new Date(currentStart.setDate(currentStart.getDate() + daysOffset));
    setCurrentWeek(getWeekRangeString(newStart));
  };

  const updateTotals = (plan, dayIndex) => {
    plan[dayIndex].dailyTotal = mealTypes.reduce(
      (sum, type) => sum + (plan[dayIndex][type]?.calories || 0), 0
    );
  };

  const handleSelectRecipe = (recipe) => {
    const { dayIndex, mealType } = selecting;
    const updated = mealPlan.map(day => ({ ...day }));
    updated[dayIndex][mealType] = {
      name: recipe.title,
      image: recipe.image,
      calories: recipe.calories,
      ingredients: recipe.ingredients || []
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

  const generateShoppingList = () => {
    const ingredientsSet = new Set();
    mealPlan.forEach(day => {
      mealTypes.forEach(type => {
        const meal = day[type];
        if (meal?.ingredients && Array.isArray(meal.ingredients)) {
          meal.ingredients.forEach(item => ingredientsSet.add(item));
        }
      });
    });
    setShoppingList(Array.from(ingredientsSet));
  };

  const featured = recipes.filter(r => r.approved);
  const myRecipes = user ? recipes.filter(r => r.createdBy === user.name) : [];

  const weeklyStats = {
    totalCalories: mealPlan.reduce((sum, day) => sum + day.dailyTotal, 0),
    dailyAverage: Math.round(mealPlan.reduce((sum, day) => sum + day.dailyTotal, 0) / 7),
    mealsPlanned: mealPlan.reduce((count, day) =>
      count + mealTypes.reduce((c, type) => c + (day[type] ? 1 : 0), 0), 0),
    slotsAvailable: 35 - mealPlan.reduce((count, day) =>
      count + mealTypes.reduce((c, type) => c + (day[type] ? 1 : 0), 0), 0)
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
            <button className="btn btn-secondary" onClick={() => changeWeekBy(-7)}>Previous Week</button>
            <span className="current-week">{currentWeek}</span>
            <button className="btn btn-secondary" onClick={() => changeWeekBy(7)}>Next Week</button>
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

          {mealTypes.map(mealType => (
            <React.Fragment key={mealType}>
              <div className="grid-header time-label">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</div>
              {mealPlan.map((day, index) => (
                <div key={`${mealType}-${index}`} className="meal-cell">
                  {day[mealType] ? (
                    <div className="meal-content">
                      <img src={day[mealType].image} alt={day[mealType].name} className="meal-image" />
                      <div className="meal-name">{day[mealType].name}</div>
                      <div className="meal-calories">{day[mealType].calories} cal</div>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveMeal(index, mealType)}>Remove</button>
                    </div>
                  ) : (
                    <div className="add-meal" onClick={() => setSelecting({ dayIndex: index, mealType })}>
                      <span className="add-icon">+</span>
                      <span>Add {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
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
              <button className="btn btn-secondary btn-sm" onClick={generateShoppingList}>Generate</button>
            </h3>
            <p>Generate a shopping list based on your meal plan.</p>
            {shoppingList.length > 0 && (
              <ul className="shopping-list">
                {shoppingList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
