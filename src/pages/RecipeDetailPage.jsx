import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApiFetch from '../hooks/useApiFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import { useShoppingList } from '../context/ShoppingListContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure.trim(),
        full: `${measure.trim()} ${ingredient.trim()}`
      });
    }
  }
  return ingredients;
};

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: details, isLoading } = useApiFetch('lookup.php', `?i=${id}`);
  const { addItem, list } = useShoppingList();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toasts, showToast, removeToast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!details || details.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Recipe not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const recipe = details[0];
  const ingredients = getIngredients(recipe);
  const favorite = isFavorite(recipe.idMeal);

  const handleAddToShoppingList = (ingredient) => {
    addItem(ingredient.full);
    showToast(`${ingredient.name} added to shopping list!`, 'success');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(recipe);
    showToast(
      favorite ? 'Removed from favorites' : 'Added to favorites!',
      favorite ? 'info' : 'success'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.strMeal,
        text: `Check out this recipe: ${recipe.strMeal}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header Section */}
          <div className="relative">
            <div className={`h-64 md:h-96 ${!imageLoaded ? 'image-loading' : ''} overflow-hidden`}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                  favorite
                    ? 'bg-red-500 text-white animate-bounce-slow'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className="w-6 h-6" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:bg-gray-100 transition-all duration-300"
                aria-label="Share recipe"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{recipe.strMeal}</h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold">
                  {recipe.strArea}
                </span>
                <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-semibold">
                  {recipe.strCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Instructions */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-indigo-600">📝</span> Instructions
                  </h2>
                  <div className="prose max-w-none">
                    {recipe.strInstructions.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>
                </div>

                {/* Video Section */}
                {recipe.strYoutube && (
                  <div className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-red-600">🎥</span> Video Tutorial
                    </h2>
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                        title="Recipe video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Ingredients Sidebar */}
              <div className="md:col-span-1">
                <div className="sticky top-4">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-green-600">🥘</span> Ingredients
                  </h2>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 shadow-lg">
                    <ul className="space-y-3">
                      {ingredients.map((ing, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <span className="text-gray-800 font-medium flex-1">{ing.full}</span>
                          <button
                            onClick={() => handleAddToShoppingList(ing)}
                            disabled={list.some(item => item.toLowerCase() === ing.full.toLowerCase())}
                            className={`ml-3 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-110 ${
                              list.some(item => item.toLowerCase() === ing.full.toLowerCase())
                                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg'
                            }`}
                          >
                            {list.some(item => item.toLowerCase() === ing.full.toLowerCase()) ? '✓ Added' : '+ Add'}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        ingredients.forEach(ing => {
                          if (!list.some(item => item.toLowerCase() === ing.full.toLowerCase())) {
                            addItem(ing.full);
                          }
                        });
                        showToast('All ingredients added to shopping list!', 'success');
                      }}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Add All to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default RecipeDetailPage;