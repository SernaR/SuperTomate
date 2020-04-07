import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './js/components/Navbar';

import AuthContext from './js/contexts/AuthContext';
import authAPI from './js/services/authAPI';
import PrivateRoute from './js/components/PrivateRoute';
import AdminRoute from './js/components/AdminRoute'
import "core-js/stable";
import "regenerator-runtime/runtime";

import LoginPage from './js/pages/LoginPage';
import HomePage from './js/pages/HomePage.jsx';
import AddRecipe from './js/pages/AddRecipePage';
import AdminPage from './js/pages/AdminPage';
import ProfilePage from './js/pages/ProfilePage';
import Recipe from './js/pages/RecipePage';
import RecipesCategoryPage from './js/pages/RecipesCategoryPage';

import './css/App.css'

authAPI.setup();

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(authAPI.isAdmin());
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      isAdmin,
      setIsAdmin,
    }}>
      <HashRouter>
        <NavbarWithRouter />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/recettes/:category" component={RecipesCategoryPage}/>
            <Route path="/recette/:category/:slug/:id" component={Recipe}/>
            <PrivateRoute path="/profile" component={ProfilePage}/>
            <PrivateRoute path="/addRecipe/:id" component={AddRecipe}/>
            <AdminRoute path="/dashboard" component={AdminPage} />
            <Route path="/" component={HomePage} />
          </Switch>
      </HashRouter>
    </AuthContext.Provider>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));