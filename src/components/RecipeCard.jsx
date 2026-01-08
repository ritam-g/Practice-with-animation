import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function RecipeCard({ recipe, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const favorite = isFavorite(recipe.idMeal);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative group">
        <div className={`w-full h-48 ${!imageLoaded ? 'image-loading' : ''} overflow-hidden`}>
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(recipe);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
            favorite 
              ? 'bg-red-500 text-white animate-bounce-slow' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg 
            className="w-5 h-5" 
            fill={favorite ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium">{recipe.strCategory}</p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            {recipe.strArea}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{recipe.strCategory}</span>
        </div>
        <Link 
          to={`/recipe/${recipe.idMeal}`} 
          className="block w-full text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;