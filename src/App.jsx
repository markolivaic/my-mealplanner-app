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
import PrivateRoute from './components/PrivateRoute';
import EditRecipe from './pages/EditRecipe';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
        <Route path="meal-plan" element={<PrivateRoute><MealPlan /></PrivateRoute>} />
        <Route path="my-recipes" element={<PrivateRoute><MyRecipes /></PrivateRoute>} />
        <Route path="edit-recipe/:id" element={<EditRecipe />} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="admin" element={<PrivateRoute adminOnly={true}><Admin /></PrivateRoute>} />
        <Route path="login" element={<LoginRegister formType="login" />} />
        <Route path="register" element={<LoginRegister formType="register" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;