// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import './index.css';
import Image from './Context/Image.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Image>
    <App/>
    </Image>
  
);