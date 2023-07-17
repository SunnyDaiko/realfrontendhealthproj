import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { CartProvider } from './components/checkout-page/CartContext';
import { UserProvider } from './components/UserContext';
import { PatientProvider } from './utils/PatientContext';

ReactDOM.render(

  <React.StrictMode>
    <UserProvider>
      <PatientProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </PatientProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
