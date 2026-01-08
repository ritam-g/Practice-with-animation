import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShoppingList } from '../../context/ShoppingListContext';
import { useFavorites } from '../../context/FavoritesContext';

function Header() {
  const { listCount } = useShoppingList();
  const { favoritesCount } = useFavorites();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="gradient-bg shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="text-white text-2xl sm:text-3xl font-extrabold hover:text-indigo-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-4xl">🍽️</span>
            <span>Recipe Planner</span>
          </Link>
          
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link 
              to="/" 
              className={`text-white text-base sm:text-lg font-semibold px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-white/20 shadow-lg' 
                  : 'hover:bg-white/10 hover:scale-110'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/favorites" 
              className={`text-white text-base sm:text-lg font-semibold px-3 py-2 rounded-lg transition-all duration-300 relative ${
                isActive('/favorites') 
                  ? 'bg-white/20 shadow-lg' 
                  : 'hover:bg-white/10 hover:scale-110'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Favorites
              </span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/shopping-list" 
              className={`text-white text-base sm:text-lg font-semibold px-3 py-2 rounded-lg transition-all duration-300 relative ${
                isActive('/shopping-list') 
                  ? 'bg-white/20 shadow-lg' 
                  : 'hover:bg-white/10 hover:scale-110'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Shopping List
              </span>
              {listCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow">
                  {listCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;