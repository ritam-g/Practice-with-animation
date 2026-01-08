// /src/pages/HomePage.js

import React, { useState } from 'react';
import useApiFetch from '../hooks/useApiFetch';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner'; // Implement this component

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('chicken');
  
  // Custom Hook usage
  const { data: recipes, isLoading, error } = useApiFetch('search.php', `?s=${searchQuery}`);

  if (isLoading) {
    return <div className="p-8"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="p-8 text-red-600 font-bold">Error: {error}</div>;
  }

  const recipeList = recipes || []; 

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Discover Your Next Meal
      </h1>
      
      {/* SearchBar component: onSearch updates the searchQuery state, triggering the useApiFetch hook */}
      <SearchBar onSearch={setSearchQuery} /> 

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipeList.length > 0 ? (
          recipeList.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-xl">
            No recipes found for "{searchQuery}". Try searching for 'beef', 'pasta', or 'fish'.
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;