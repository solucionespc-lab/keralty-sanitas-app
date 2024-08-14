import 'assets/GlobalStyles.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { establecerVariables } from 'configuraciones/Localstorage';

import App from './app/App';

establecerVariables();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
