// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import { BrowserRouter } from 'react-router-dom';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserAuthProvider } from './context/UserAuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <UserAuthProvider>
        <FavoritesProvider>
          <ShoppingListProvider>
            <App />
          </ShoppingListProvider>
        </FavoritesProvider>
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);