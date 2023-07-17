import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import ProfilePage from '../profile-page/ProfilePage';
/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/home" render={() => <ProductPage />} />
      <Route exact path="/checkout" render={() => <CheckoutPage />} />
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route path="/Patients" render={() => <MaintenancePage />} />
      <Route exact path="/profile" render={() => <ProfilePage />} />
    </Switch>
  </BrowserRouter>
);

export default App;
