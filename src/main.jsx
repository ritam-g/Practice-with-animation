// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// 💡 The import below requires 'App.jsx' to use 'export default App;'
import App from './App.jsx'; 
import { BrowserRouter } from 'react-router-dom';
import { ShoppingListProvider } from './context/ShoppingListContext';
import './index.css'; // Global CSS/Tailwind import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter needed for routing */}
    <BrowserRouter> 
      {/* ShoppingListProvider gives global state access */}
      <ShoppingListProvider>
        <App />
      </ShoppingListProvider>
    </BrowserRouter>
  </React.StrictMode>
);