import 'assets/GlobalStyles.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { establecerVariables } from 'configuraciones/LocalStorage';

import App from './app/App';

establecerVariables();

const docRoot = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(docRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
