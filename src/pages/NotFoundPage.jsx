import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-indigo-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page not found. Maybe try a new recipe search?</p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;

