// /src/pages/RecipeDetailPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import useApiFetch from '../hooks/useApiFetch';
import { useShoppingList } from '../context/ShoppingListContext';

// Helper function to extract and format ingredients from the messy API data
const getIngredients = (recipe) => {
    const ingredients = [];
    // TheMealDB uses strIngredient1 -> strIngredient20 and strMeasure1 -> strMeasure20
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        }
    }
    return ingredients;
};

function RecipeDetailPage() {
  const { id } = useParams();
  const { data: details, isLoading } = useApiFetch('lookup.php', `?i=${id}`);
  const { addItem, list } = useShoppingList(); // Context Consumption

  if (isLoading) return <div className="p-8"><LoadingSpinner /></div>;
  if (!details || details.length === 0) return <h2 className="p-8 text-center text-red-500">Recipe not found.</h2>;
  
  const recipe = details[0];
  const ingredients = getIngredients(recipe);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-lg my-10">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">{recipe.strMeal}</h1>
      <p className="text-lg text-gray-600 mb-6">{recipe.strArea} | {recipe.strCategory}</p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-auto object-cover rounded-lg shadow-md mb-6"
          />
          <h3 className="text-2xl font-semibold mt-4 mb-3 text-gray-800">Instructions</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800 border-b pb-2">Ingredients</h3>
          <ul className="space-y-2">
            {ingredients.map((ing, index) => (
              <li key={index} className="flex justify-between items-center text-gray-700 border-b border-gray-100 py-1">
                <span>{ing}</span>
                <button 
                  onClick={() => addItem(ing)} // Context function call
                  disabled={list.includes(ing)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition ${
                    list.includes(ing) 
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {list.includes(ing) ? 'Added ✓' : 'Add'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;