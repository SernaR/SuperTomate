import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import authContext from '../contexts/AuthContext';
import Field from '../components/forms/Field.jsx';

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(authContext);
    
    const [credentials, setCredentials] = useState({
        username: "henri43@orange.fr",
        password: "password"
    });
    const [error, setError] = useState("");

    //gestion des champs du formulaire
    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value })
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try{
            await authAPI.authenticate(credentials);
            setIsAuthenticated(true);
            setError('');
            history.replace("/profile");
        } catch(error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas")
            console.log(error.response)
        }
    }

    return ( <>
        <h1>Connexion à l'application</h1> 
        <form onSubmit={handleSubmit}>
            <Field 
                name="username" 
                label="Adresse email" 
                value={credentials.username} 
                onChange={handleChange}
                placeholder="Adresse email de connexion"
                type="email" 
                error ={error}
            /> 
            <Field 
                name="password" 
                label="Mot de passe" 
                value={credentials.password}
                onChange={handleChange}
                type="password" 
               
            />        
            <div className="form-group">
                <button 
                    type="submit" 
                    className="btn btn-success"
                >Je me connecte</button>
            </div>
        </form>
    </>
    );
}
 
export default LoginPage;