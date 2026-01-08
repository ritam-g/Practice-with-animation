// /src/context/ShoppingListContext.js

import React, { createContext, useContext, useState } from 'react';

const ShoppingListContext = createContext();

// Custom hook for easy consumption
export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

export const ShoppingListProvider = ({ children }) => {
  const [list, setList] = useState([]);

  // Adds a unique item to the list
  const addItem = (item) => {
    setList(prevList => {
        const normalizedItem = item.trim().toLowerCase();
        if (prevList.map(i => i.toLowerCase()).includes(normalizedItem)) {
            return prevList; // Already exists
        }
        return [...prevList, item];
    });
  };

  // Removes an item from the list
  const removeItem = (itemToRemove) => {
    setList(prevList => prevList.filter(item => item !== itemToRemove));
  };
  
  const contextValue = {
    list,
    addItem,
    removeItem,
    listCount: list.length,
  };

  return (
    <ShoppingListContext.Provider value={contextValue}>
      {children}
    </ShoppingListContext.Provider>
  );
};