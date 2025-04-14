import { useState } from 'react';
import mealPlanData from '../data/mealplan';

const MealPlan = () => {
  const [currentWeek, setCurrentWeek] = useState('June 12 - June 18, 2025');

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

  const previousWeek = () => setCurrentWeek('June 5 - June 11, 2025');
  const nextWeek = () => setCurrentWeek('June 19 - June 25, 2025');

  const handleAddMeal = (day, mealType) => {
    console.log(`Adding ${mealType} for ${weekdays[day]}`);
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
              {mealPlanData.map((day, index) => (
                <div key={`${mealType}-${index}`} className="meal-cell">
                  {day[mealType] ? (
                    <div className="meal-content">
                      <img src={day[mealType].image} alt={day[mealType].name} className="meal-image" />
                      <div className="meal-name">{day[mealType].name}</div>
                      <div className="meal-calories">{day[mealType].calories} cal</div>
                    </div>
                  ) : (
                    <div className="add-meal" onClick={() => handleAddMeal(index, mealType)}>
                      <span className="add-icon">+</span>
                      <span>Add {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}

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
