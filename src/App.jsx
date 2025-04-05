import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import MealPlan from './pages/MealPlan';
import MyRecipes from './pages/MyRecipies';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import LoginRegister from './pages/LoginRegister';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="meal-plan" element={<MealPlan />} />
        <Route path="my-recipes" element={<MyRecipes />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<LoginRegister formType="login" />} />
        <Route path="register" element={<LoginRegister formType="register" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;