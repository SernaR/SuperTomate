import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import authAPI from '../services/authAPI';
import recipesAPI from '../services/recipesAPI';
import Axios from 'axios';
import { ReactSVG } from 'react-svg';
    
//utiliser le cache pour les categories

const Navbar = ({ history }) => {
    const [categories, setCategories] = useState([])
    
    useEffect( () => {
        const source = Axios.CancelToken.source()
        const fetchCategories = async() => {
            try {
                const { categories } = await recipesAPI.getCategories(source.token)
                setCategories(categories)
            } catch(err) {
                if (Axios.isCancel(err)) {
                    // request cancelled
                    console.log(err.response)
                } else {
                    throw err;
                }  
            }
        }  
        fetchCategories()
        return () => {
            source.cancel();
        }
    }, [])

    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext);
    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
        history.push("/login");
    } 

    const categotyList = categories.map( category => 
        <li className="nav-item" key={ category.id }>
            <NavLink className="nav-link" to={ "/recettes/" + category.name }>{ category.name }</NavLink>
        </li> //color + border-bottom:2px solid pour active
    )
    
    return ( 
        <header>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light d-flex flex-row-reverse">
                <NavLink className="navbar-brand mr-4" to="/"><ReactSVG src="/images/mascotte-super-tomate-succ.svg"/></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        { categotyList }
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        { !isAuthenticated &&
                            <>
                                { 0 ===1 && <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Inscription</NavLink>
                                </li>}
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-danger" >Connexion</NavLink>
                                </li>
                            </> || <>
                                { isAdmin &&
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                                    </li>
                                }
                                <li className="nav-item">
                                        <NavLink to="/profile" className="nav-link">Profil</NavLink>
                                </li>
                                <li className="nav-item">
                                        <NavLink to="/addRecipe/new" className="btn btn-outline-success mx-2">Nouvelle recette</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={handleLogout}
                                        className="btn btn-danger"
                                    >Déconnexion</button>
                                </li>
                            </> 
                        }
                    </ul>
                </div>
            </nav>
        </header>    
    );
};
 
export default Navbar;

