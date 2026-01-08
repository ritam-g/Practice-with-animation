// /src/pages/ShoppingListPage.js

import React from 'react';
import { useShoppingList } from '../context/ShoppingListContext'; // Context Consumption

function ShoppingListPage() {
  const { list, removeItem } = useShoppingList();

  return (
    <div className="max-w-3xl mx-auto p-8 my-10 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
        Your Shopping List ({list.length} Items)
      </h1>

      {list.length === 0 ? (
        <p className="text-xl text-gray-500 text-center mt-10">
          Your shopping list is empty! Add ingredients from a recipe detail page.
        </p>
      ) : (
        <ul className="space-y-3">
          {list.map((item, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-lg text-gray-800">{item}</span>
              <button 
                onClick={() => removeItem(item)} // Context function call
                className="bg-red-500 text-white text-sm px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingListPage;