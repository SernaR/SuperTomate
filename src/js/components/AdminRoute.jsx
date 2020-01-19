import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const AdminRoute = ({ path, component }) => {
    const { isAdmin } = useContext(AuthContext);
    return isAdmin ? <Route path={path} component={component} /> : <Redirect to="/login" />
}
 
export default AdminRoute;
