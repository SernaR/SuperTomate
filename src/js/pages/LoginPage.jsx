import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import authContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import Cockpit from '../components/Cockpit';
import PageBlock from '../components/blocks/pageBlock';
import toast from '../services/toaster' 


const LoginPage = ({ history }) => {
    const { setIsAuthenticated, setIsAdmin } = useContext(authContext);
    
    const [credentials, setCredentials] = useState({
        email: "sblack@gmail.fr",
        password: "password0"
    });
    
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value })
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};

        try{
            const userName = await authAPI.authenticate(credentials);
            
            setIsAuthenticated(authAPI.isAuthenticated());
            setIsAdmin(authAPI.isAdmin())
            setErrors({
                email: '',
                password: ''
            });

            toast.success('hello ' + userName)
            history.push("/profile");

        } catch ({ response }) {
            const messages = response.data;
            if(messages) {
                messages.map( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                toast.error("Il y a des erreurs dans votre formulaire")
            } 
        }
    }

    return (
        <PageBlock back="utilisateur"> 
            <form onSubmit={handleSubmit}>
                <Cockpit title="Connexion à l'application" />
                <Field 
                    name="email" 
                    label="Adresse email" 
                    value={credentials.email} 
                    onChange={handleChange}
                    placeholder="Adresse email de connexion"
                    type="email" 
                    error ={errors.email}
                /> 
                <Field 
                    name="password" 
                    label="Mot de passe" 
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    error ={errors.password}
                />        
                <div className="row justify-content-end mr-1 mb-3">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >Je me connecte</button>
                </div>
            </form>  
        </PageBlock>
    );
}
 
export default LoginPage;