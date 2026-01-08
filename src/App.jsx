// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import ShoppingListPage from './pages/ShoppingListPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* Define your application routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} /> 
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// 🔑 THE CRUCIAL FIX: Default export matches the import in main.jsx
export default App;