// /src/components/RecipeCard.js

import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">{recipe.strMeal}</h3>
        <p className="text-sm text-gray-500 mb-4">{recipe.strArea} Dish</p>
        <Link 
          to={`/recipe/${recipe.idMeal}`} 
          className="block w-full text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;