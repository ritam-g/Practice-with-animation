import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import useApiFetch from '../hooks/useApiFetch';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';
import { getRandomMeal, getCategories } from '../api/recipeService';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  
  const { data: recipes, isLoading, error } = useApiFetch(
    selectedCategory ? 'filter.php' : 'search.php',
    selectedCategory ? `?c=${selectedCategory}` : `?s=${searchQuery}`
  );

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const handleRandomRecipe = async () => {
    try {
      const randomRecipes = await getRandomMeal();
      if (randomRecipes && randomRecipes.length > 0) {
        navigate(`/recipe/${randomRecipes[0].idMeal}`);
        showToast('Random recipe loaded!', 'success');
      }
    } catch (err) {
      showToast('Failed to load random recipe', 'error');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSearchQuery('');
  };

  const recipeList = recipes || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16 mb-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-scale-in">
            Discover Your Next Meal 🍽️
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8">
            Explore thousands of delicious recipes from around the world
          </p>
          <SearchBar onSearch={setSearchQuery} onRandom={handleRandomRecipe} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-10 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.slice(0, 12).map((cat) => (
                <button
                  key={cat.strCategory}
                  onClick={() => handleCategoryClick(cat.strCategory)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 ${
                    selectedCategory === cat.strCategory
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:bg-indigo-50'
                  }`}
                >
                  {cat.strCategory}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center animate-fade-in">
            <p className="text-red-600 font-bold text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && !error && (
          <>
            {selectedCategory && (
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedCategory} Recipes
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Clear Filter
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipeList.length > 0 ? (
                recipeList.map((recipe, index) => (
                  <RecipeCard key={recipe.idMeal} recipe={recipe} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 animate-fade-in">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-gray-600 mb-2">
                    No recipes found for "{searchQuery || selectedCategory}"
                  </p>
                  <p className="text-gray-500">
                    Try searching for 'beef', 'pasta', 'fish', or 'dessert'
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default HomePage;