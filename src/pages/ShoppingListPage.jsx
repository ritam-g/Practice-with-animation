import React from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

function ShoppingListPage() {
  const { list, removeItem, listCount } = useShoppingList();
  const { toasts, showToast, removeToast } = useToast();

  const handleRemove = (item) => {
    removeItem(item);
    showToast(`${item} removed from list`, 'info');
  };

  const handleClearAll = () => {
    list.forEach(item => removeItem(item));
    showToast('Shopping list cleared!', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden animate-fade-in">
          <div className="gradient-bg-3 text-white p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              Your Shopping List 🛒
            </h1>
            <p className="text-xl text-indigo-100">
              {listCount} {listCount === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="p-6 md:p-8">
            {list.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-8xl mb-6 animate-bounce-slow">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Your shopping list is empty!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Add ingredients from recipe detail pages to get started.
                </p>
              </div>
            ) : (
              <>
                {list.length > 1 && (
                  <div className="mb-6 flex justify-end">
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                    >
                      Clear All
                    </button>
                  </div>
                )}
                <ul className="space-y-3">
                  {list.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="text-lg text-gray-800 font-medium">{item}</span>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="ml-4 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default ShoppingListPage;