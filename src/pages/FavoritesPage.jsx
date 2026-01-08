import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="text-center animate-fade-in max-w-md mx-auto px-6">
          <div className="text-8xl mb-6 animate-bounce-slow">❤️</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No Favorites Yet</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start exploring recipes and add your favorites to see them here!
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Discover Recipes →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Your Favorite Recipes ❤️
          </h1>
          <p className="text-xl text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe, index) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;

