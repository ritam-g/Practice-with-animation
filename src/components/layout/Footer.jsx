import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="gradient-bg text-white py-8 mt-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-base font-semibold mb-2 animate-fade-in">
              Made with ❤️ for foodies and planners
            </p>
            <p className="text-sm text-indigo-200">
              Discover, save, and cook amazing recipes from around the world
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            <Link 
              to="/" 
              className="hover:text-indigo-200 transition-all duration-300 transform hover:scale-110 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className="hover:text-indigo-200 transition-all duration-300 transform hover:scale-110 font-medium"
            >
              Favorites
            </Link>
            <Link 
              to="/shopping-list" 
              className="hover:text-indigo-200 transition-all duration-300 transform hover:scale-110 font-medium"
            >
              Shopping List
            </Link>
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-200 transition-all duration-300 transform hover:scale-110 font-medium flex items-center gap-1"
            >
              <span>Powered by</span>
              <span className="font-bold">TheMealDB</span>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-indigo-700 text-center text-xs text-indigo-200">
          © {new Date().getFullYear()} Recipe Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

