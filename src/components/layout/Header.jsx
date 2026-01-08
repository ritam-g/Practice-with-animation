// /src/components/layout/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingList } from '../../context/ShoppingListContext';

function Header() {
  const { listCount } = useShoppingList();

  return (
    <header className="bg-indigo-700 p-4 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold hover:text-indigo-200 transition">
          Recipe Planner 🍽️
        </Link>
        
        <nav className="flex space-x-6">
          <Link to="/" className="text-white text-lg hover:text-indigo-200 transition">
            Home
          </Link>
          
          <Link 
            to="/shopping-list" 
            className="text-white text-lg hover:text-indigo-200 transition relative"
          >
            Shopping List
            {/* Display list count badge */}
            {listCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {listCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;