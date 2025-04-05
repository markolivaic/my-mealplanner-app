import { useState } from 'react';

const MealPlan = () => {
  const [currentWeek, setCurrentWeek] = useState('June 12 - June 18, 2023');
  
  // Staticki podaci o jelima, kasnije će biti zamijenjeni API pozivom
  const mealPlanData = [
    // Staticki podaci o jelima u tjednu, kasnije će biti zamijenjeni API pozivom
    {
      breakfast: { name: 'Oatmeal', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 320 },
      lunch: { name: 'Greek Salad', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 380 },
      dinner: { name: 'Whole Wheat Pasta', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 480 },
      dailyTotal: 1180
    },
    {
      breakfast: { name: 'Banana Oatmeal', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 350 },
      lunch: null,
      dinner: null,
      dailyTotal: 350
    },
    {
      breakfast: null,
      lunch: { name: 'Turkey Sandwich', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 420 },
      dinner: null,
      dailyTotal: 420
    },
    {
      breakfast: null,
      lunch: null,
      dinner: { name: 'Baked Salmon', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 520 },
      dailyTotal: 520
    },
    {
      breakfast: { name: 'Berry Smoothie', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 290 },
      lunch: { name: 'Vegetable Soup', image: 'public/images/pexels-ella-olsson-572949-1640775.png', calories: 250 },
      dinner: null,
      dailyTotal: 540
    },
    {
      breakfast: null,
      lunch: null,
      dinner: null,
      dailyTotal: 0
    },
    {
      breakfast: null,
      lunch: null,
      dinner: null,
      dailyTotal: 0
    }
  ];

  // Weekly statistics
  const weeklyStats = {
    totalCalories: mealPlanData.reduce((sum, day) => sum + day.dailyTotal, 0),
    dailyAverage: Math.round(mealPlanData.reduce((sum, day) => sum + day.dailyTotal, 0) / 7),
    mealsPlanned: mealPlanData.reduce((count, day) => {
      return count + (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.dinner ? 1 : 0);
    }, 0),
    slotsAvailable: 21 - mealPlanData.reduce((count, day) => {
      return count + (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.dinner ? 1 : 0);
    }, 0)
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  const previousWeek = () => {
    setCurrentWeek('June 5 - June 11, 2025');
    // U pravoj aplikaciji, ovo bi povuklo podatke za prethodni tjedan
  };

  const nextWeek = () => {
    setCurrentWeek('June 19 - June 25, 2025');
    // U pravoj aplikaciji, ovo bi povuklo podatke za sljedeći tjedan
  };

  const handleAddMeal = (day, mealType) => {
    console.log(`Adding ${mealType} for ${weekdays[day]}`);
    // U pravoj aplikaciji, ovo bi otvorilo modal za dodavanje jela
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

          {/* Breakfast Row */}
          <div className="grid-header time-label">Breakfast</div>
          {mealPlanData.map((day, index) => (
            <div key={`breakfast-${index}`} className="meal-cell">
              {day.breakfast ? (
                <div className="meal-content">
                  <img src={day.breakfast.image} alt={day.breakfast.name} className="meal-image" />
                  <div className="meal-name">{day.breakfast.name}</div>
                  <div className="meal-calories">{day.breakfast.calories} cal</div>
                </div>
              ) : (
                <div className="add-meal" onClick={() => handleAddMeal(index, 'breakfast')}>
                  <span className="add-icon">+</span>
                  <span>Add Breakfast</span>
                </div>
              )}
            </div>
          ))}

          {/* Lunch Row */}
          <div className="grid-header time-label">Lunch</div>
          {mealPlanData.map((day, index) => (
            <div key={`lunch-${index}`} className="meal-cell">
              {day.lunch ? (
                <div className="meal-content">
                  <img src={day.lunch.image} alt={day.lunch.name} className="meal-image" />
                  <div className="meal-name">{day.lunch.name}</div>
                  <div className="meal-calories">{day.lunch.calories} cal</div>
                </div>
              ) : (
                <div className="add-meal" onClick={() => handleAddMeal(index, 'lunch')}>
                  <span className="add-icon">+</span>
                  <span>Add Lunch</span>
                </div>
              )}
            </div>
          ))}

          {/* Dinner Row */}
          <div className="grid-header time-label">Dinner</div>
          {mealPlanData.map((day, index) => (
            <div key={`dinner-${index}`} className="meal-cell">
              {day.dinner ? (
                <div className="meal-content">
                  <img src={day.dinner.image} alt={day.dinner.name} className="meal-image" />
                  <div className="meal-name">{day.dinner.name}</div>
                  <div className="meal-calories">{day.dinner.calories} cal</div>
                </div>
              ) : (
                <div className="add-meal" onClick={() => handleAddMeal(index, 'dinner')}>
                  <span className="add-icon">+</span>
                  <span>Add Dinner</span>
                </div>
              )}
            </div>
          ))}

          {/* Daily Totals */}
          <div className="grid-header time-label">Daily Total</div>
          {mealPlanData.map((day, index) => (
            <div key={`total-${index}`} className="grid-header daily-total">
              {day.dailyTotal} cal
            </div>
          ))}
        </div>

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