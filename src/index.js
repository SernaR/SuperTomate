import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './js/pages/homepage/HomePage.jsx';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './js/components/Navbar';
import Profile from './js/pages/Profile';
import LoginPage from './js/pages/LoginPage';
import AuthContext from './js/contexts/AuthContext';
import authAPI from './js/services/authAPI';
import PrivateRoute from './js/components/PrivateRoute';
import "core-js/stable";
import "regenerator-runtime/runtime";
import AddRecipe from './js/pages/recipes/addRecipe/AddRecipe.jsx';
import AdminPage from './js/pages/AdminPage.jsx';
import Recipe from './js/pages/recipes/recipe/Recipe.jsx';

authAPI.setup();

//TODO :  page d'erreur

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated
    }}>
      <HashRouter>
        <NavbarWithRouter />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/recipe/:id" component={Recipe}/>
            <Route path="/admin" component={AdminPage} />
            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute path="/addRecipe" component={AddRecipe}/>
            <Route path="/" component={HomePage} />
          </Switch>
      </HashRouter>
    </AuthContext.Provider>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));