import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './js/pages/HomePage.jsx';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './js/components/Navbar.jsx';
import Profile from './js/pages/Profile.jsx';
import LoginPage from './js/pages/LoginPage.jsx';
import AuthContext from './js/contexts/AuthContext.js';
import authAPI from './js/services/authAPI.js';
import PrivateRoute from './js/components/PrivateRoute.jsx';
import "core-js/stable";
import "regenerator-runtime/runtime";

authAPI.setup();

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
        <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/profile" component={Profile}/>
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));