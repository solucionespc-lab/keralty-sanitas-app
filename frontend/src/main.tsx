import 'assets/GlobalStyles.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { establecerVariables } from 'configuraciones/LocalStorage';
import Login from 'autenticacion/Login';
import MiddlewareApp from 'app/MiddlewareApp';

establecerVariables();

const docRoot = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(docRoot).render(
  <React.StrictMode>
    <MiddlewareApp>
      <Login />
    </MiddlewareApp>
  </React.StrictMode>
);
