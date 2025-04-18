import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';  // Tu archivo de estilos
import App from './App';  // Importa el componente principal
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';  // Para el enrutamiento

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
